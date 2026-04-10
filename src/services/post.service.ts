import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { PostResponseDataType } from "@/types/post.type";
import { PaginationResponseDataType } from "@/types/response.type";

export const postService = {
    getNewsfeed: async (page: number = 0, size: number = 10) => {
        const response = await httpClient.get<PaginationResponseDataType<PostResponseDataType[]>>(API_ROUTES.POSTS.GET_NEWSFEED
            .replace(":page", page.toString())
            .replace(":size", size.toString())
        );
        return response;
    }
}