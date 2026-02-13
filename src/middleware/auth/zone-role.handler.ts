import { NextRequest, NextResponse } from "next/server";
import { ZoneRoleConfigType } from "./zone-role.type";
import { jwtDecode } from "jwt-decode";
import { authService } from "@/services/auth.service";
import { TOKEN_TYPE } from "@/constants/token-type";
import { ROUTES } from "@/constants/routes";

const BUFFER_TIME = 5 * 1000;

export const zoneRoleHandler = async ({
    request,
    config,
    accessToken,
    refreshToken,
}: {
    request: NextRequest;
    config: ZoneRoleConfigType;
    accessToken?: string;
    refreshToken?: string;
}) => {
    const onGoingPath = request.nextUrl.pathname;
    const isAuthRoute = config.authRoutes.some(route => onGoingPath.startsWith(route));
    const isPrivateRoute = onGoingPath === ROUTES.HOME || config.privateRoutes.some(route => onGoingPath.startsWith(route));
    const isPublicRoute = !isAuthRoute && !isPrivateRoute;

    if (isAuthRoute) {
        if (accessToken) {
            return NextResponse.redirect(new URL(config.redirectRoute, request.url));
        }
        return NextResponse.next();
    }

    if (!refreshToken) {
        if (isPublicRoute) {
            return NextResponse.next();
        }
        return redirectToLogin(request, config);
    }

    let shouldRefreshToken = false;
    if (!accessToken) {
        shouldRefreshToken = true;
    } else {
        try {
            const { exp } = jwtDecode(accessToken);
            const expirationTime = (exp ?? 0) * 1000;
            const currentTime = Date.now();
            if (expirationTime - currentTime < BUFFER_TIME) {
                console.log("Token sắp hết hạn, refresh chủ động tại Middleware");
                shouldRefreshToken = true;
            }
        } catch (error) {
            shouldRefreshToken = true;
        }
    }

    if (!shouldRefreshToken) {
        return NextResponse.next();
    }

    console.log("Middleware đang thực hiện Refresh...");

    const newTokensPair = await authService.refreshToken({ token: refreshToken });

    if (newTokensPair && newTokensPair.accessToken && newTokensPair.refreshToken) {
        const response = NextResponse.next();
        const { exp: atExp } = jwtDecode(newTokensPair.accessToken);
        const { exp: rtExp } = jwtDecode(newTokensPair.refreshToken);

        response.cookies.set(
            TOKEN_TYPE.ACCESS_TOKEN,
            newTokensPair.accessToken,
            {
                httpOnly: true,
                path: "/",
                sameSite: "lax",
                expires: new Date((atExp ?? 0) * 1000),
            }
        );

        response.cookies.set(
            TOKEN_TYPE.REFRESH_TOKEN,
            newTokensPair.refreshToken,
            {
                httpOnly: true,
                path: "/",
                sameSite: "lax",
                expires: new Date((rtExp ?? 0) * 1000),
            }
        );

        response.headers.set("Authorization", `Bearer ${newTokensPair.accessToken}`);

        return response;
    }

    return redirectToLogin(request, config);
}

const redirectToLogin = (request: NextRequest, config: ZoneRoleConfigType) => {
    const loginUrl = new URL(config.loginRoute, request.url);
    if (request.nextUrl.pathname !== ROUTES.HOME) {
        loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    }
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(TOKEN_TYPE.ACCESS_TOKEN);
    response.cookies.delete(TOKEN_TYPE.REFRESH_TOKEN);
    return response;
}