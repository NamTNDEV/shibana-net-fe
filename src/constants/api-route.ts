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
        GET_ME: "identity/users/me",
    },
} as const;

export const NEXT_SERVER_ROUTES = {
    USER: {
        ME: "/api/users/me",
    }
}