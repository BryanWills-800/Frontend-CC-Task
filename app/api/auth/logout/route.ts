import { NextResponse } from "next/server";

const AUTH_COOKIE = "auth-token";

export async function POST() {
    const response = NextResponse.json({ isLoggedIn: false });

    response.cookies.set({
        name: AUTH_COOKIE,
        value: "",
        path: "/",
        maxAge: 0,
    });

    return response;
}
