import { NextResponse } from "next/server";
import type { LoginBody } from "@/types";

const AUTH_COOKIE = "auth-token";
const AUTH_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function encodeAuthData(email: string, password: string) {
    const payload = JSON.stringify({
        email,
        password,
        createdAt: new Date().toISOString(),
    });

    return Buffer.from(payload, "utf8").toString("base64url");
}

export async function POST(request: Request) {
    const body = (await request.json().catch(() => null)) as LoginBody | null;
    const email = body?.email?.trim();
    const password = body?.password;

    if (!email || !password) {
        return NextResponse.json(
            { isLoggedIn: false, error: "Email and password are required." },
            { status: 400 }
        );
    }

    const response = NextResponse.json({
        isLoggedIn: true,
        email,
    });

    response.cookies.set({
        name: AUTH_COOKIE,
        value: encodeAuthData(email, password),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: AUTH_MAX_AGE_SECONDS,
    });

    return response;
}
