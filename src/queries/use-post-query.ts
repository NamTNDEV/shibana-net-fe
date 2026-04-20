import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { HttpError } from "@/lib/http-errors";
import { PostResponseDataType } from "@/types/post.type";
import { PaginationResponseDataType } from "@/types/response.type";
import { useInfiniteQuery } from "@tanstack/react-query"

const PAGE_SIZE = 3;

export const usePostNewsfeedQuery = (isAllowFetch: boolean = true) => {
    return useInfiniteQuery({
        enabled: isAllowFetch,
        queryKey: ["posts-newsfeed"],
        initialPageParam: 0,
        queryFn: async ({ pageParam }) => {
            const url = NEXT_SERVER_ROUTES.POSTS.GET_NEWSFEED
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
