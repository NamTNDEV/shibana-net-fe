import { NextRequest, NextResponse } from "next/server";
import { ZoneRoleConfigType } from "./zone-role.type";
import { ROUTES } from "@/constants/routes";

export const zoneRoleHandler = ({
    request,
    config,
    accessToken,
}: {
    request: NextRequest;
    config: ZoneRoleConfigType;
    accessToken?: string;
}) => {
    const onGoingPath = request.nextUrl.pathname;
    const isAuthRoute = config.authRoutes.some(route => onGoingPath.startsWith(route));
    const isPrivateRoute = config.privateRoutes.some(route => onGoingPath.startsWith(route)) || onGoingPath === ROUTES.HOME;
    if (isAuthRoute && accessToken) {
        return NextResponse.redirect(new URL(config.redirectRoute, request.url));
    } else if (isPrivateRoute && !accessToken) {
        const loginUrl = new URL(config.loginRoute, request.url);
        loginUrl.searchParams.set("redirect", onGoingPath);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}   