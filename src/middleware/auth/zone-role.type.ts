export type ZoneRoleConfigType = {
    authRoutes: string[];
    privateRoutes: string[];
    publicRoutes?: string[];
    loginRoute: string;
    redirectRoute: string;
    isMatchingPath: (path: string) => boolean;
}