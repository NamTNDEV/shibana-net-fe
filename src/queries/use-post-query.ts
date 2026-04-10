import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { HttpError } from "@/lib/http-errors";
import { PostResponseDataType } from "@/types/post.type";
import { PaginationResponseDataType } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query"

export const usePostNewsfeedQuery = (isAllowFetch: boolean = true) => {
    return useQuery({
        enabled: isAllowFetch,
        queryKey: ["posts-newsfeed"],
        queryFn: async () => {
            const response = await fetch(NEXT_SERVER_ROUTES.POSTS.GET_NEWSFEED);
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
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true // true is Default, but write it for clarity
    })
}