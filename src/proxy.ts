// /middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { AUTH_ROUTES, PRIVATE_ROUTES, ROUTES } from "./constants/routes";
import { getCookies } from "./lib/cookies";

export default async function proxy(request: NextRequest) {
    const onGoingPath = request.nextUrl.pathname;
    const accessToken = await getCookies("accessToken");

    const isAuthRoute = AUTH_ROUTES.some(route => onGoingPath.startsWith(route));
    const isPrivateRoute = PRIVATE_ROUTES.some(route => onGoingPath.startsWith(route));
    if (isAuthRoute && accessToken) {
        return NextResponse.redirect(new URL("/", request.url));
    } else if (isPrivateRoute && !accessToken) {
        return NextResponse.redirect(new URL(`${ROUTES.AUTH.LOGIN}?redirect=${encodeURIComponent(onGoingPath)}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Loại trừ các route thuộc group API, static files, image optimizations, và .png files
        '/((?!api|_next/static|_next/image|\\.well-known|.*\\.(?:png|jpg|jpeg|gif|svg|ico)$|favicon\\.ico).*)',
    ],
}