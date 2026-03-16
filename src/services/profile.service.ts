import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { ProfileUpdateRequestBodyType, UpdateAvatarImageRequestBodyType, UpdateCoverImageRequestBodyType } from "@/types/profile.type";

export const profileService = {
    updateCoverImage: async (body: UpdateCoverImageRequestBodyType) => {
        const response = await httpClient.patch<any>(API_ROUTES.PROFILES.UPDATE_COVER_IMAGE, {
            body
        });
        return response;
    },
    updateAvatar: async (body: UpdateAvatarImageRequestBodyType) => {
        const response = await httpClient.patch<any>(API_ROUTES.PROFILES.UPDATE_AVATAR_IMAGE, {
            body
        });
        return response;
    },
    updateProfile: async (body: ProfileUpdateRequestBodyType) => {
        const response = await httpClient.patch<any>(API_ROUTES.PROFILES.UPDATE_PROFILE, {
            body
        });
        return response;
    }
}