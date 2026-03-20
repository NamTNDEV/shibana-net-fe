import { API_ROUTES } from "@/constants/api-route"
import { httpClient } from "@/lib/http-client"

export const connectionService = {
    follow: async (followeeId: string) => {
        const response = await httpClient.post<void>(API_ROUTES.CONNECTIONS.FOLLOW, {
            body: {
                followeeId
            }
        });
        return response;
    },
    unfollow: async (followeeId: string) => {
        const response = await httpClient.delete<void>(API_ROUTES.CONNECTIONS.UNFOLLOW.replace(":followeeId", followeeId));
        return response;
    }
}