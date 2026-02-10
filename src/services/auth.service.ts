import envConfig from "@/config/env";
import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { LoginRequestBodyType, LoginResponseDataType, RefreshTokenRequestBodyType, RefreshTokenResponseDataType, RegisterRequestBodyType, RegisterResponseDataType } from "@/types/auth.type";

export const authService = {
    register: async (body: RegisterRequestBodyType) => {
        const response = await httpClient.post<RegisterResponseDataType>(API_ROUTES.AUTH.REGISTER, { body });
        return response;
    },
    login: async (body: LoginRequestBodyType) => {
        const response = await httpClient.post<LoginResponseDataType>(API_ROUTES.AUTH.LOGIN, { body });
        return response;
    },
    logout: async () => {
        const response = await httpClient.post<void>(API_ROUTES.AUTH.LOGOUT);
        return response;
    },
    refreshToken: async (body: RefreshTokenRequestBodyType): Promise<RefreshTokenResponseDataType | null> => {
        try {
            const response = await fetch(`${envConfig.NEXT_PUBLIC_API_BASE_URL}/${API_ROUTES.AUTH.REFRESH_TOKEN}`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                return null;
            }
            const payload = await response.json();
            return payload.data;
        } catch (error) {
            console.error("Error:: ", error);
            return null;
        }
    }
}