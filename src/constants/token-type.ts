export const TOKEN_TYPE = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
} as const;

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE]