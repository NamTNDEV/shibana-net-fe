import { LoginSchema } from "@/schemas/auth.schema";
import z from "zod";

// Request
export type LoginRequestBodyType = z.infer<typeof LoginSchema>

// Response
export type LoginResponseDataType = {
    accessToken: string
    refreshToken: string
}