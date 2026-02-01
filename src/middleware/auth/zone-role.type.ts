export type ZoneRoleConfigType = {
    authRoutes: string[];
    privateRoutes: string[];
    loginRoute: string;
    redirectRoute: string;
    isMatchingPath: (path: string) => boolean;
}