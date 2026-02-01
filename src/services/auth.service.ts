import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { LoginRequestBodyType, LoginResponseDataType } from "@/types/auth.type";

export const authService = {
    login: async (body: LoginRequestBodyType) => {
        const response = await httpClient.post<LoginResponseDataType>(API_ROUTES.AUTH.LOGIN, { body });
        return response;
    }
}