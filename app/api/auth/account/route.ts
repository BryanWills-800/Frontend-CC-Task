import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deleteUser } from "@/app/lib/userService";
import type { User } from "@/types";

const AUTH_COOKIE = "auth-token";

function decodeAuthData(cookieValue: string) {
    try {
        const raw = Buffer.from(cookieValue, "base64url").toString("utf8");
        const data = JSON.parse(raw) as Partial<User>;

        return typeof data.email === "string" ? data : null;
    } catch {
        return null;
    }
}

function clearAuthCookie(response: NextResponse) {
    response.cookies.set({
        name: AUTH_COOKIE,
        value: "",
        path: "/",
        maxAge: 0,
    });
}

export async function DELETE() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(AUTH_COOKIE)?.value;

    if (!authCookie) {
        return NextResponse.json(
            { isLoggedIn: false, error: "No authenticated user found." },
            { status: 401 }
        );
    }

    const authData = decodeAuthData(authCookie);

    if (!authData?.email) {
        const response = NextResponse.json(
            { isLoggedIn: false, error: "Invalid auth session." },
            { status: 401 }
        );
        clearAuthCookie(response);
        return response;
    }

    const deleted = await deleteUser({
        name: "",
        role: "",
        email: authData.email,
        password: "",
    });

    if (!deleted) {
        const response = NextResponse.json(
            { isLoggedIn: false, error: "Account was not found." },
            { status: 404 }
        );
        clearAuthCookie(response);
        return response;
    }

    const response = NextResponse.json({ isLoggedIn: false });
    clearAuthCookie(response);
    return response;
}
