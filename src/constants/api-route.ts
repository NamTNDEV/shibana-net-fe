export const API_ROUTES = {
    AUTH: {
        LOGIN: "identity/auth/login",
        REGISTER: "identity/auth/register",
        INTROSPECT: "identity/auth/introspect",
        LOGOUT: "identity/auth/logout",
    },
    USERS: {
        HELLO_WORLD: "identity/users/hello-world",
        GET_ME: "identity/users/me",
    },
} as const;