'use client';

import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { useAuthStore } from "@/stores/auth.store";
import { CreatePostRequestBodyType, PostResponseDataType } from "@/types/post.type";
import { ResponseDataType } from "@/types/response.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient();
    const { authUser } = useAuthStore();

    return useMutation({
        mutationFn: async (body: CreatePostRequestBodyType) => {
            const response = await fetch(NEXT_SERVER_ROUTES.POSTS.POST, {
                method: "POST",
                body: JSON.stringify(body),
            });
            return await response.json() as ResponseDataType<PostResponseDataType>;
        },
        onMutate: async (body: CreatePostRequestBodyType) => {
            await queryClient.cancelQueries({ queryKey: ["posts", "newsfeed", "cursor-based"] });
            const previousPosts = queryClient.getQueryData(["posts", "newsfeed", "cursor-based"]);

            const optimisticPost: PostResponseDataType = {
                id: `temp-id-${Date.now()}`,
                content: body.content,
                commentCount: 0,
                privacy: body.privacy,
                createdAt: new Date().toISOString(),
                author: {
                    id: authUser!.userId || "temp-user-id",
                    username: authUser!.username || "temp-username",
                    avatarUrl: authUser!.avatar || "",
                    firstName: authUser!.firstName || "Temp",
                    lastName: authUser!.lastName || "User",
                    avatarPositionX: authUser!.avatarPositionX || 0,
                    avatarPositionY: authUser!.avatarPositionY || 0,
                    avatarScale: authUser!.avatarScale || 1,
                }
            }

            queryClient.setQueryData(["posts", "newsfeed", "cursor-based"], (oldData: any) => {
                if (!oldData || !oldData?.pages) return oldData;
                const newData = JSON.parse(JSON.stringify(oldData))
                newData.pages[0].payload.unshift(optimisticPost)
                return newData
            });

            return { previousPosts };
        },
        onSuccess: (data) => {
            const createdPost = data.data;
            queryClient.setQueryData(["posts", "newsfeed", "cursor-based"], (oldData: any) => {
                if (!oldData || !oldData.pages) return oldData;
                const newData = JSON.parse(JSON.stringify(oldData));

                newData.pages[0].payload = newData.pages[0].payload.map((post: any) => {
                    return post.content === createdPost.content ? createdPost : post
                });
                return newData;
            });
            toast.success("Bài viết đã được đăng!", { position: "bottom-right" });
        },
        onError: (err, newPost, context) => {
            console.error("❌ Failed to create post:", err);
        },
    })
}