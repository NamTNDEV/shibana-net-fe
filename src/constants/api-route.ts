export const API_ROUTES = {
    AUTH: {
        LOGIN: "identity/auth/login",
        REGISTER: "identity/auth/register",
        INTROSPECT: "identity/auth/introspect",
        LOGOUT: "identity/auth/logout",
        REFRESH_TOKEN: "identity/auth/refresh-token",
    },
    USERS: {
        HELLO_WORLD: "identity/users/hello-world",
        MY_ACCOUNT: "identity/users/me/account",
    },
    PROFILES: {
        PROFILE_BY_USERNAME: "social/profiles/:username",
        UPDATE_COVER_IMAGE: "social/profiles/me/cover",
    },
    MEDIA: {
        UPLOAD_COVER_IMAGE: "media/upload",
    }
} as const;

export const NEXT_SERVER_ROUTES = {
    USER: {
        MY_ACCOUNT: "/api/users/me",
    }
}