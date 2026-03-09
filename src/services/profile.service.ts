import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { UpdateAvatarImageRequestBodyType, UpdateCoverImageRequestBodyType } from "@/types/profile.type";

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
    }
}