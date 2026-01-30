import { API_ROUTE } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { LoginRequestBodyType, LoginResponseDataType } from "@/types/auth";

export const authService = {
    login: async (body: LoginRequestBodyType) => {
        const response = await httpClient.post<LoginResponseDataType>(API_ROUTE.AUTH.LOGIN, { body });
        return response;
    }
}