'use server'

import { HttpError } from "@/lib/http-errors";
import { getErrorMessage } from "@/lib/utils";
import { authService } from "@/services/auth";
import { LoginRequestBodyType } from "@/types/auth";
import { cookies } from "next/headers";

type ActionResponseType = {
    success: boolean
    message: string
    code?: number
}

export async function loginAction(body: LoginRequestBodyType): Promise<ActionResponseType> {
    try {
        const response = await authService.login(body);

        const cookieStore = await cookies();
        cookieStore.set("accessToken", response.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        cookieStore.set("refreshToken", response.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30 * 7, // 7 days
            path: "/",
        });

        return {
            success: true,
            message: "Đăng nhập thành công",
        };
    } catch (error) {
        if (error instanceof HttpError) {
            return {
                success: false,
                message: getErrorMessage(error.payload.code),
                code: error.payload.code
            };
        }
        return { success: false, message: "Lỗi hệ thống, vui lòng thử lại sau." };
    }
}