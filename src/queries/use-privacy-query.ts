import { NEXT_SERVER_ROUTES } from "@/constants/api-route"
import { HttpError } from "@/lib/http-errors";
import { useQuery } from "@tanstack/react-query"

export const usePrivacyListQuery = (isAllowFetch: boolean = true) => {
    return useQuery({
        enabled: isAllowFetch,
        queryKey: ["privacy-list"],
        queryFn: async () => {
            const res = await fetch(NEXT_SERVER_ROUTES.PRIVACIES.GET_LIST);
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
            const data = await res.json();
            return data;
        },
        staleTime: Infinity,
    })
}