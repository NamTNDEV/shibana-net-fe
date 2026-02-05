'use server'

import { ROUTES } from "@/constants/routes";
import { deleteCookies, getCookies, setCookies } from "@/lib/cookies";
import { HttpError } from "@/lib/http-errors";
import { getErrorMessage } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import { LoginRequestBodyType } from "@/types/auth.type";
import { redirect } from "next/navigation";

type ActionResponseType = {
    success: boolean
    message: string
    code?: number
}

export async function loginAction(body: LoginRequestBodyType): Promise<ActionResponseType> {
    try {
        const response = await authService.login(body);

        await setCookies({
            name: "accessToken", value: response.accessToken, options: {
                maxAge: 60 * 60 * 24, // 1 day
            }
        });

        await setCookies({
            name: "refreshToken", value: response.refreshToken, options: {
                maxAge: 60 * 60 * 24 * 30 * 7, // 7 days
            }
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

export async function logoutAction(): Promise<void> {
    const accessToken = await getCookies("accessToken");

    if (accessToken) {
        try {
            await authService.logout(accessToken);
        } catch (error) {
            if (error instanceof HttpError) {
                console.error(error.payload.code);
            } else {
                console.error(error);
            }
        }
        finally {
            await deleteCookies("accessToken");
            await deleteCookies("refreshToken");
        }
        redirect(ROUTES.AUTH.LOGIN);
    }
}