import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const AUTH_COOKIE = "auth-token";

function decodeEmail(cookieValue: string) {
    try {
        const raw = Buffer.from(cookieValue, "base64url").toString("utf8");
        const data = JSON.parse(raw) as { email?: unknown };

        return typeof data.email === "string" ? data.email : null;
    } catch {
        return null;
    }
}

export async function GET() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(AUTH_COOKIE)?.value;

    return NextResponse.json({
        isLoggedIn: Boolean(authCookie),
        email: authCookie ? decodeEmail(authCookie) : null,
    });
}
