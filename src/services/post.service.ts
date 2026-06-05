import { API_ROUTES } from "@/constants/api-route";
import { httpClient } from "@/lib/http-client";
import { httpClientV02 } from "@/lib/http-client-v02";
import { CreatePostRequestBodyType, EditPostRequestBodyType, PostResponseDataType } from "@/types/post.type";
import { CursorPaginationResponseDataType, PaginationResponseDataType } from "@/types/response.type";
import omit from 'lodash/omit';

export const postService = {
    getNewsfeed: async (page: number = 0, size: number = 10) => {
        const response = await httpClient.get<PaginationResponseDataType<PostResponseDataType[]>>(API_ROUTES.POSTS.NEWSFEED
            .replace(":page", page.toString())
            .replace(":size", size.toString())
        );
        return response;
    },
    getNewsfeedCursorBased: async (size: number = 10, cursor: string | null = null) => {
        const response = await httpClient.get<CursorPaginationResponseDataType<PostResponseDataType[]>>(API_ROUTES.POSTS.NEWSFEED_CURSOR_BASED
            .replace(":size", size.toString())
            .replace("&cursor=:cursor", cursor ? `&cursor=${cursor}` : "")
        );
        return response;
    },
    getNewsfeedCursorBasedV02: async (size: number = 10, cursor: string | null = null) => {
        const response = await httpClientV02.get<CursorPaginationResponseDataType<PostResponseDataType[]>>(API_ROUTES.POSTS.NEWSFEED_CURSOR_BASED
            .replace(":size", size.toString())
            .replace("&cursor=:cursor", cursor ? `&cursor=${cursor}` : "")
        );
        return response;
    },
    createPost: async (body: CreatePostRequestBodyType) => {
        const response = await httpClientV02.post<PostResponseDataType>(API_ROUTES.POSTS._, { body });
        return response;
    },
    editPost: async (postId: string, body: EditPostRequestBodyType) => {
        const omittedBody = omit(body, ["id"]);
        const response = await httpClientV02.put<PostResponseDataType>(API_ROUTES.POSTS.DETAIL.replace(":postId", postId), { body: omittedBody });
        return response;
    }
}
