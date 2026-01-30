import { LoginSchema } from "@/schemas/auth";
import z from "zod";

export type LoginRequestBodyType = z.infer<typeof LoginSchema>

export type LoginResponseDataType = {
    accessToken: string
    refreshToken: string
}