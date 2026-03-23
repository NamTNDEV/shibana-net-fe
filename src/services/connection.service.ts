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
    },
    sendFriendRequest: async (recieverId: string) => {
        const response = await httpClient.post<void>(API_ROUTES.CONNECTIONS.SEND_FRIEND_REQUEST.replace(":recieverId", recieverId));
        return response;
    },
    acceptFriendRequest: async (recieverId: string) => {
        const response = await httpClient.post<void>(API_ROUTES.CONNECTIONS.ACCEPT_FRIEND_REQUEST.replace(":recieverId", recieverId));
        return response;
    },
    rejectFriendRequest: async (recieverId: string) => {
        const response = await httpClient.post<void>(API_ROUTES.CONNECTIONS.REJECT_FRIEND_REQUEST.replace(":recieverId", recieverId));
        return response;
    },
    unfriend: async (recieverId: string) => {
        const response = await httpClient.delete<void>(API_ROUTES.CONNECTIONS.UNFRIEND.replace(":recieverId", recieverId));
        return response;
    },
    revokeFriendRequest: async (revokeeId: string) => {
        const response = await httpClient.delete<void>(API_ROUTES.CONNECTIONS.REVOKE_FRIEND_REQUEST.replace(":revokeeId", revokeeId));
        return response;
    },
    blockUser: async (blockeeId: string) => {
        const response = await httpClient.post<void>(API_ROUTES.CONNECTIONS.BLOCK_USER.replace(":blockeeId", blockeeId));
        return response;
    },
    unblockUser: async (blockeeId: string) => {
        const response = await httpClient.delete<void>(API_ROUTES.CONNECTIONS.UNBLOCK_USER.replace(":blockeeId", blockeeId));
        return response;
    },
}