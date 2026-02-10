import { LoginSchema, RegisterSchema } from "@/schemas/auth.schema";
import z from "zod";

// Request
export type LoginRequestBodyType = z.infer<typeof LoginSchema>

export type RegisterRequestBodyType = Omit<z.infer<typeof RegisterSchema>, "confirmPassword">

export type RefreshTokenRequestBodyType = {
    token: string
}
// Response
export type LoginResponseDataType = {
    accessToken: string
    refreshToken: string
}

export type RegisterResponseDataType = LoginResponseDataType;

export type RefreshTokenResponseDataType = {
    accessToken: string
    refreshToken: string
}