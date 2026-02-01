import { NextRequest } from "next/server";
import { getCookies } from "./lib/cookies";
import { userZoneRoleConfig, adminZoneRoleConfig } from './middleware/auth/zone-role.config';
import { zoneRoleHandler } from "./middleware/auth";

export default async function proxy(request: NextRequest) {
    const accessToken = await getCookies("accessToken");
    const onGoingPath = request.nextUrl.pathname;

    const activeConfig = adminZoneRoleConfig.isMatchingPath(onGoingPath) ? adminZoneRoleConfig : userZoneRoleConfig;
    return zoneRoleHandler({ request, config: activeConfig, accessToken });
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|\\.well-known|.*\\.(?:png|jpg|jpeg|gif|svg|ico)$|favicon\\.ico).*)',
    ],
}