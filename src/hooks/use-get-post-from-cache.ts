'use client';

import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { PostResponseDataType } from "@/types/post.type";

export const useGetPostFromCache = (editingPostId: string | null) => {
    const queryClient = useQueryClient();

    const postToEdit = useMemo(() => {
        if (!editingPostId) return null;

        const cacheData = queryClient.getQueryData<any>(["posts", "newsfeed", "cursor-based"]);
        if (!cacheData || !cacheData.pages) return null;

        for (const page of cacheData.pages) {
            const foundPost = page.payload.find((post: any) => post.id === editingPostId);
            if (foundPost) {
                return foundPost as PostResponseDataType;
            }
        }

        return null;
    }, [editingPostId, queryClient]);

    return postToEdit;
};