import { ADMIN_AUTH_ROUTES, ADMIN_PRIVATE_ROUTES, AUTH_ROUTES, PRIVATE_ROUTES, ROUTES } from "@/constants/routes";
import { ZoneRoleConfigType } from "./zone-role.type";

export const adminZoneRoleConfig: ZoneRoleConfigType = {
    authRoutes: ADMIN_AUTH_ROUTES,
    privateRoutes: ADMIN_PRIVATE_ROUTES,
    loginRoute: ROUTES.ADMIN.LOGIN,
    redirectRoute: ROUTES.ADMIN.DASHBOARD,
    isMatchingPath: (path: string) => path.startsWith(ROUTES.ADMIN.ROOT),
}

export const userZoneRoleConfig: ZoneRoleConfigType = {
    authRoutes: AUTH_ROUTES,
    privateRoutes: PRIVATE_ROUTES,
    loginRoute: ROUTES.AUTH.LOGIN,
    redirectRoute: ROUTES.HOME,
    isMatchingPath: (path: string) => path.startsWith(ROUTES.HOME),
}