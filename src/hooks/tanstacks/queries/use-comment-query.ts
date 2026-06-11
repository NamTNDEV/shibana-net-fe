import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { HttpError } from "@/lib/http-errors";
import { CommentResponseDataType } from "@/types/post.type";
import { CursorPaginationResponseDataType } from "@/types/response.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const ROOT_COMMENT_SIZE = 3;
const REPLIES_COMMENT_SIZE = 1;

type UseRootCommentQueryOptions = {
    isAllowFetch?: boolean
    fetchSize?: number
    postId: string
}

type UseRepliesCommentQueryOptions = Omit<UseRootCommentQueryOptions, "postId"> & {
    commentId: string
}

export const useRootCommentQuery = ({ isAllowFetch = true, fetchSize = ROOT_COMMENT_SIZE, postId }: UseRootCommentQueryOptions) => {
    return useInfiniteQuery({
        enabled: isAllowFetch,
        queryKey: ["comments", "list", "cursor-based", postId],
        initialPageParam: "",
        queryFn: async ({ pageParam, signal }) => {
            const url = NEXT_SERVER_ROUTES.COMMENTS.COMMENT_LIST
                .replace(":postId", postId)
                .replace(":cursor", pageParam)
                .replace(":size", fetchSize.toString())

            const res = await fetch(url, { signal })

            if (!res.ok) {
                const errorPayload = await res.json().catch(() => null);
                throw new HttpError({
                    status: res.status,
                    payload: {
                        code: errorPayload?.code || res.status,
                        message: errorPayload?.message || res.statusText
                    }
                });
            }

            const data = (await res.json()).data as CursorPaginationResponseDataType<CommentResponseDataType[]>
            return data
        },
        getNextPageParam: (lastPage) => {
            return lastPage.hasNext ? lastPage.nextCursor : undefined;
        },
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true
    })
}

export const useRepliesCommentQuery = ({ isAllowFetch = true, fetchSize = REPLIES_COMMENT_SIZE, commentId }: UseRepliesCommentQueryOptions) => {
    return useInfiniteQuery({
        enabled: isAllowFetch,
        queryKey: ["comments", "replies", "cursor-based", commentId],
        initialPageParam: "",
        queryFn: async ({ pageParam, signal }) => {
            const url = NEXT_SERVER_ROUTES.COMMENTS.REPLY_COMMENT_LIST
                .replace(":commentId", commentId)
                .replace(":cursor", pageParam)
                .replace(":size", fetchSize.toString())

            const res = await fetch(url, { signal })

            if (!res.ok) {
                const errorPayload = await res.json().catch(() => null);
                throw new HttpError({
                    status: res.status,
                    payload: {
                        code: errorPayload?.code || res.status,
                        message: errorPayload?.message || res.statusText
                    }
                });
            }

            const data = (await res.json()).data as CursorPaginationResponseDataType<CommentResponseDataType[]>
            return data
        },
        getNextPageParam: (lastPage) => {
            return lastPage.hasNext ? lastPage.nextCursor : undefined;
        },
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true
    })
}