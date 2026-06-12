import { API_ROUTES } from "@/constants/api-route";
import { httpClientV02 } from "@/lib/http-client-v02";
import { CommentResponseDataType, CreateReplyCommentRequestBodyType, CreateRootCommentRequestBodyType, EditCommentRequestBodyType } from "@/types/post.type";
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
    createRootComment: async (body: CreateRootCommentRequestBodyType, postId: string) => {
        console.log("Creating root comment with body:", body, "for postId:", postId);
        const response = await httpClientV02.post<CommentResponseDataType>(API_ROUTES.COMMENTS.CREATE_COMMENT.replace(":postId", postId), {
            body
        });
        return response;
    },
    editComment: async (id: string, body: EditCommentRequestBodyType) => {
        const response = await httpClientV02.put<CommentResponseDataType>(API_ROUTES.COMMENTS.UPDATE_COMMENT.replace(":commentId", id), { body });
        return response;
    },
    deleteComment: async (id: string) => {
        const response = await httpClientV02.delete<void>(API_ROUTES.COMMENTS.DELETE_COMMENT.replace(":commentId", id));
        return response;
    },

    // Comment's Reply:
    getRepliesCommentList: async (commentId: string, size: number = 10, cursor: string | null = null) => {
        const response = await httpClientV02.get<CursorPaginationResponseDataType<CommentResponseDataType[]>>(API_ROUTES.COMMENTS.REPLY_COMMENT_LIST
            .replace(":commentId", commentId)
            .replace(":size", size.toString())
            .replace("&cursor=:cursor", cursor ? `&cursor=${cursor}` : "")
        );
        return response;
    },
    createReplyComment: async (body: CreateReplyCommentRequestBodyType, commentId: string) => {
        console.log("Creating reply comment with body:", body, "for commentId:", commentId);
        const response = await httpClientV02.post<CommentResponseDataType>(API_ROUTES.COMMENTS.CREATE_REPLY_COMMENT.replace(":commentId", commentId), {
            body
        });
        return response;
    }
}
