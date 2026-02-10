import { NextRequest } from "next/server";
import { userZoneRoleConfig, adminZoneRoleConfig } from './middleware/auth/zone-role.config';
import { zoneRoleHandler } from "./middleware/auth";
import { TOKEN_TYPE } from "./constants/token-type";

export default async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get(TOKEN_TYPE.ACCESS_TOKEN)?.value;
    const refreshToken = request.cookies.get(TOKEN_TYPE.REFRESH_TOKEN)?.value;
    const onGoingPath = request.nextUrl.pathname;

    const activeConfig = adminZoneRoleConfig.isMatchingPath(onGoingPath) ? adminZoneRoleConfig : userZoneRoleConfig;
    return await zoneRoleHandler({ request, config: activeConfig, accessToken, refreshToken });
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|\\.well-known|.*\\.(?:png|jpg|jpeg|gif|svg|ico)$|favicon\\.ico).*)',
    ],
}