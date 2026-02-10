import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { UserResponseDataType } from "@/types/user.type";
import React from "react";

export const userService = {
    getMe: React.cache(async (): Promise<UserResponseDataType | null> => {
        const response = await httpClient.get<UserResponseDataType>(API_ROUTES.USERS.GET_ME, { cache: "no-store" });
        return response;
    }),
    safeGetMe: React.cache(async (): Promise<UserResponseDataType | null> => {
        try {
            const response = await httpClient.get<UserResponseDataType>(API_ROUTES.USERS.GET_ME, { cache: "no-store" });
            return response;
        } catch (error) {
            return null;
        }
    }),
}