import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { PostResponseDataType } from "@/types/post.type";
import { CursorPaginationResponseDataType, PaginationResponseDataType } from "@/types/response.type";

export const postService = {
    getNewsfeed: async (page: number = 0, size: number = 10) => {
        const response = await httpClient.get<PaginationResponseDataType<PostResponseDataType[]>>(API_ROUTES.POSTS.GET_NEWSFEED
            .replace(":page", page.toString())
            .replace(":size", size.toString())
        );
        return response;
    },
    getNewsfeedCursorBased: async (size: number = 10, cursor: string | null = null) => {
        const response = await httpClient.get<CursorPaginationResponseDataType<PostResponseDataType[]>>(API_ROUTES.POSTS.GET_NEWSFEED_CURSOR_BASED
            .replace(":size", size.toString())
            .replace("&cursor=:cursor", cursor ? `&cursor=${cursor}` : "")
        );
        return response;
    }
}