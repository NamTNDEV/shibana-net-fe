import { API_ROUTES } from "@/constants/api-route";
import { httpClientV02 } from "@/lib/http-client-v02";
import { CommentResponseDataType } from "@/types/post.type";
import { CursorPaginationResponseDataType } from "@/types/response.type";

export const commentService = {
    getCommentList: async (postId: string, size: number = 10, cursor: string | null = null) => {
        const response = await httpClientV02.get<CursorPaginationResponseDataType<CommentResponseDataType[]>>(API_ROUTES.COMMENTS.COMMENT_LIST
            .replace(":postId", postId)
            .replace(":size", size.toString())
            .replace("&cursor=:cursor", cursor ? `&cursor=${cursor}` : "")
        );
        return response;
    },
    // createPost: async (body: CreatePostRequestBodyType) => {
    //     const response = await httpClientV02.post<PostResponseDataType>(API_ROUTES.POSTS._, { body });
    //     return response;
    // },
    // editPost: async (postId: string, body: EditPostRequestBodyType) => {
    //     const omittedBody = omit(body, ["id"]);
    //     const response = await httpClientV02.put<PostResponseDataType>(API_ROUTES.POSTS.DETAIL.replace(":postId", postId), { body: omittedBody });
    //     return response;
    // },
    // getPostDetailById: async (postId: string) => {
    //     try {
    //         const response = await httpClientV02.get<PostResponseDataType>(API_ROUTES.POSTS.DETAIL.replace(":postId", postId));
    //         return response.data;
    //     } catch (error) {
    //         console.error(`🚨 Error fetching post detail for postId ${postId} ~ `, error);
    //         return null;
    //     }
    // }
}
