import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { HttpError } from "@/lib/http-errors";
import { PostResponseDataType } from "@/types/post.type";
import { CursorPaginationResponseDataType, PaginationResponseDataType } from "@/types/response.type";
import { useInfiniteQuery } from "@tanstack/react-query"

const PAGE_SIZE = 10;

export const usePostNewsfeedQuery = (isAllowFetch: boolean = true) => {
    return useInfiniteQuery({
        enabled: isAllowFetch,
        queryKey: ["posts", "newsfeed", "pagination"],
        initialPageParam: 0,
        queryFn: async ({ pageParam }) => {
            const url = NEXT_SERVER_ROUTES.POSTS.NEWSFEED
                .replace(":page", pageParam.toString())
                .replace(":size", PAGE_SIZE.toString());

            const response = await fetch(url);

            if (!response.ok) {
                const errorPayload = await response.json().catch(() => null);
                throw new HttpError({
                    status: response.status,
                    payload: {
                        code: errorPayload?.code || response.status,
                        message: errorPayload?.message || response.statusText
                    }
                });
            }
            const data = await response.json();
            return data.data as PaginationResponseDataType<PostResponseDataType[]>;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.payload.length === 0) {
                return undefined;
            }

            return allPages.length;
        },
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true // true is Default, but write it for clarity
    })
}

export const usePostNewsfeedCursorBasedQuery = (isAllowFetch: boolean = true, fetchSize: number = PAGE_SIZE) => {
    return useInfiniteQuery({
        enabled: isAllowFetch,
        queryKey: ["posts", "newsfeed", "cursor-based"],
        initialPageParam: "",
        queryFn: async ({ pageParam, signal }) => {
            const url = NEXT_SERVER_ROUTES.POSTS.NEWSFEED_CURSOR_BASED
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

            const data = (await res.json()).data as CursorPaginationResponseDataType<PostResponseDataType[]>
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
