import { API_ROUTES } from "@/constants/api-route";
import { getCookies } from "@/lib/cookies";
import { httpClient } from "@/lib/http-client";
import { UserResponseDataType } from "@/types/user.type";

export const userService = {
    getMe: async (): Promise<UserResponseDataType> => {
        const response = await httpClient.get<UserResponseDataType>(API_ROUTES.USERS.GET_ME,
            {
                headers: {
                    "Authorization": `Bearer ${await getCookies("accessToken")}`
                }
            }
        );
        return response;
    }
}