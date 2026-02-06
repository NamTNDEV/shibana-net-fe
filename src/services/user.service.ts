import { API_ROUTES } from "@/constants/api-route";
import { FETCH_TAGS } from "@/constants/tags";
import { getCookies } from "@/lib/cookies";
import { httpClient } from "@/lib/http-client";
import { UserResponseDataType } from "@/types/user.type";
import React from "react";

export const userService = {
    getMe: React.cache(async (): Promise<UserResponseDataType | null> => {
        const accessToken = await getCookies("accessToken");
        if (!accessToken) {
            return null;
        }

        try {
            const response = await httpClient.get<UserResponseDataType>(
                API_ROUTES.USERS.GET_ME,
                {
                    headers: { "Authorization": `Bearer ${accessToken}` },
                    next: {
                        tags: [FETCH_TAGS.USERS.GET_ME]
                    }
                }
            );
            return response;
        } catch (error) {
            console.error("UserService - getMe failed:", error);
            return null;
        }
    }),
}