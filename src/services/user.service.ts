import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { ProfileResponseDataType } from "@/types/profile.type";
import { MyAccountMetadataResponseDataType } from "@/types/user.type";
import React from "react";

export const userService = {
    getMyAccountMetadata: React.cache(async (): Promise<MyAccountMetadataResponseDataType | null> => {
        const response = await httpClient.get<MyAccountMetadataResponseDataType>(API_ROUTES.USERS.MY_ACCOUNT, { cache: "no-store" });
        return response;
    }),
    safeGetMyAccountMetadata: React.cache(async (): Promise<MyAccountMetadataResponseDataType | null> => {
        try {
            const response = await httpClient.get<MyAccountMetadataResponseDataType>(API_ROUTES.USERS.MY_ACCOUNT, { cache: "no-store" });
            return response;
        } catch (error) {
            return null;
        }
    }),
    getProfileByUsername: React.cache(async (username: string): Promise<ProfileResponseDataType | null> => {
        const response = await httpClient.get<ProfileResponseDataType>(API_ROUTES.PROFILES.PROFILE_BY_USERNAME.replace(":username", username), { cache: "no-store" });
        return response;
    }),
}   