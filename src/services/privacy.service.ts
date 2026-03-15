import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { PrivacyResponseDataType } from "@/types/privacy.type";

export const privacyService = {
    getList: async (): Promise<PrivacyResponseDataType[]> => {
        const response = await httpClient.get<PrivacyResponseDataType[]>(API_ROUTES.PRIVACIES.GET_LIST);
        return response;
    }
}