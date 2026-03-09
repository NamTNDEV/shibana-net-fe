import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { UploadMediaRequestBodyType } from "@/types/media.type";

export const mediaService = {
    uploadMedia: async (body: UploadMediaRequestBodyType) => {
        const formData = new FormData();
        formData.append("file", body.file);
        const response = await httpClient.post<any>(API_ROUTES.MEDIA.UPLOAD_IMAGE, {
            body: formData,
        });
        return response;
    },
}