export const API_ROUTE = {
    AUTH: {
        LOGIN: "identity/auth/login",
        REGISTER: "identity/auth/register",
        INTROSPECT: "identity/auth/introspect",
    },
    USERS: {
        HELLO_WORLD: "identity/users/hello-world",
    },
} as const;