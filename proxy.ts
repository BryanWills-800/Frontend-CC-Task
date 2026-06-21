import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "auth-token";
const authPages = ["/login", "/signup"];
const protectedPages = ["/dashboard", "/iss-tracking"];

function startsWithAny(pathname: string, paths: string[]) {
    return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function proxy(request: NextRequest) {
    const token = request.cookies.get(AUTH_COOKIE)?.value;
    const { pathname } = request.nextUrl;

    if (startsWithAny(pathname, authPages) && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (startsWithAny(pathname, protectedPages) && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login/:path*", "/signup/:path*", "/dashboard/:path*", "/iss-tracking/:path*"],
};
