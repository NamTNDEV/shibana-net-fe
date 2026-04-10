import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { PostResponseDataType } from "@/types/post.type";

export const postService = {
    getNewsfeed: async () => {
        const response = await httpClient.get<PostResponseDataType[]>(API_ROUTES.POSTS.GET_NEWSFEED);
        return response;
    }
}