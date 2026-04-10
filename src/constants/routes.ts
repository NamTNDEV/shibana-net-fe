export const ROUTES = {
    HOME: "/",
    FORBIDDEN: "/forbidden",
    AUTH: {
        LOGIN: "/login",
        REGISTER: "/register",
    },
    ADMIN: {
        ROOT: "/manage",
        LOGIN: "/manage/login",
        DASHBOARD: "/manage/dashboard",
    },
    USER: {
        PROFILE: "/@:handle",
        EDIT: "/@:handle/about",
        PHOTOS: "/@:handle/photos",
        FRIENDS: "/@:handle/friends",
        REELS: "/@:handle/reels",
    },
    POST: {
        HASHTAG: "/hashtag/:hashtag",
    },
} as const;

export const PUBLIC_ROUTES = [
    ROUTES.FORBIDDEN,
    ROUTES.USER.PROFILE,
    ROUTES.USER.EDIT,
    ROUTES.USER.PHOTOS,
    ROUTES.USER.FRIENDS,
    ROUTES.USER.REELS,
];

export const PRIVATE_ROUTES = [
];

export const AUTH_ROUTES = [
    ROUTES.AUTH.LOGIN,
    ROUTES.AUTH.REGISTER,
];

export const ADMIN_PRIVATE_ROUTES = [
    ROUTES.ADMIN.DASHBOARD,
];

export const ADMIN_AUTH_ROUTES = [
    ROUTES.ADMIN.LOGIN,
];