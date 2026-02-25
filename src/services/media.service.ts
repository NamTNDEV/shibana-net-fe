import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { UploadCoverImageRequestBodyType } from "@/types/media.type";

export const mediaService = {
    uploadCoverImage: async (body: UploadCoverImageRequestBodyType) => {
        const formData = new FormData();
        formData.append("file", body.file);
        const response = await httpClient.post<any>(API_ROUTES.MEDIA.UPLOAD_COVER_IMAGE, {
            body: formData,
        });
        return response;
    }
}