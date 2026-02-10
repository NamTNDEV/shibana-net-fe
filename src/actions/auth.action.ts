'use server'

import { ROUTES } from "@/constants/routes";
import { TOKEN_TYPE } from "@/constants/token-type";
import { deleteCookies, setAuthCookie } from "@/lib/cookies";
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

        await setAuthCookie({ token: response.accessToken, tokenType: TOKEN_TYPE.ACCESS_TOKEN });
        await setAuthCookie({ token: response.refreshToken, tokenType: TOKEN_TYPE.REFRESH_TOKEN });

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
    try {
        await authService.logout();
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