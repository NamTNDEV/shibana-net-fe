export const ROUTES = {
    HOME: "/",
    AUTH: {
        LOGIN: "/login",
        REGISTER: "/register",
    },
    ADMIN: {
        LOGIN: "/manage/login",
        DASHBOARD: "/manage/dashboard",
    },
} as const;

export const PUBLIC_ROUTES = [
    ROUTES.HOME,
];

export const PRIVATE_ROUTES = [
    ROUTES.ADMIN.DASHBOARD,
];

export const AUTH_ROUTES = [
    ROUTES.AUTH.LOGIN,
    ROUTES.AUTH.REGISTER,
    ROUTES.ADMIN.LOGIN,
];