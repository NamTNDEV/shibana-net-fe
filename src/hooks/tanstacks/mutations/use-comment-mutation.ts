'use client';

import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { useAuthStore } from "@/stores/auth.store";
import { CommentResponseDataType, CreateRootCommentRequestBodyType, CreatePostRequestBodyType, EditPostRequestBodyType, PostResponseDataType } from "@/types/post.type";
import { ResponseDataType } from "@/types/response.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateRootCommentMutation = (onCreateSuccess: () => void) => {
    const queryClient = useQueryClient();
    const { authUser } = useAuthStore();

    return useMutation({
        mutationFn: async ({ body, postId }: { body: CreateRootCommentRequestBodyType, postId: string }) => {
            const response = await fetch(NEXT_SERVER_ROUTES.COMMENTS.CREATE_COMMENT
                .replace(":postId", postId),
                {
                    method: "POST",
                    body: JSON.stringify(body),
                });
            return await response.json() as ResponseDataType<CommentResponseDataType>;
        },
        onMutate: async ({ body, postId }: { body: CreateRootCommentRequestBodyType, postId: string }) => {
            onCreateSuccess();

            await queryClient.cancelQueries({ queryKey: ["comments", "list", "cursor-based", postId] });
            const previousComments = queryClient.getQueryData(["comments", "list", "cursor-based", postId]);

            const fakeId = `optimistic-${crypto.randomUUID()}`;

            const optimisticComment: CommentResponseDataType = {
                id: fakeId,
                parentId: null,
                level: 0,
                content: body.content,
                createdAt: new Date().toISOString(),
                replyCount: 0,
                isEdited: false,
                author: {
                    id: authUser!.userId || "",
                    username: authUser!.username || "",
                    avatarUrl: authUser!.avatar || "",
                    firstName: authUser!.firstName || "",
                    lastName: authUser!.lastName || "",
                    avatarPositionX: authUser!.avatarPositionX || 0,
                    avatarPositionY: authUser!.avatarPositionY || 0,
                    avatarScale: authUser!.avatarScale || 1,
                }
            }

            queryClient.setQueryData(["comments", "list", "cursor-based", postId], (oldData: any) => {
                if (!oldData || !oldData?.pages) return oldData;
                const newData = JSON.parse(JSON.stringify(oldData))
                newData.pages[0].payload.unshift(optimisticComment)
                return newData
            });

            return { previousComments, fakeId };
        },
        onSuccess: (data, newComment, context) => {
            const createdComment = data.data;
            queryClient.setQueryData(["comments", "list", "cursor-based", newComment.postId], (oldData: any) => {
                if (!oldData || !oldData.pages) return oldData;
                const newData = JSON.parse(JSON.stringify(oldData));

                newData.pages[0].payload = newData.pages[0].payload.map((comment: any) => {
                    return comment.id === context?.fakeId ? createdComment : comment;
                });
                return newData;
            });
            toast.success("Bình luận đã được đăng!", {
                position: "bottom-right",
                richColors: true,
                duration: 3000,
            })
        },
        onError: (err, newComment, context) => {
            queryClient.setQueryData(["comments", "list", "cursor-based", newComment.postId], context?.previousComments);
        },
    })
}

// export const useEditPostMutation = (onEditSuccess: () => void) => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (body: EditPostRequestBodyType) => {
//             const response = await fetch(NEXT_SERVER_ROUTES.POSTS.POST_DETAIL.replace(":postId", body.id), {
//                 method: "PUT",
//                 body: JSON.stringify(body),
//             });
//             return await response.json() as ResponseDataType<null>;
//         },
//         onMutate: async (body: EditPostRequestBodyType) => {
//             onEditSuccess();
//             await queryClient.cancelQueries({ queryKey: ["posts", "newsfeed", "cursor-based"] });
//             const previousPosts = queryClient.getQueryData(["posts", "newsfeed", "cursor-based"]);

//             queryClient.setQueryData(["posts", "newsfeed", "cursor-based"], (oldData: any) => {
//                 if (!oldData || !oldData.pages) return oldData;
//                 const newData = JSON.parse(JSON.stringify(oldData));

//                 newData.pages = newData.pages.map((page: any) => {
//                     page.payload = page.payload.map((post: any) => {
//                         if (post.id === body.id) {
//                             return {
//                                 ...post,
//                                 content: body.content,
//                                 privacy: body.privacy,
//                             };
//                         }
//                         return post;
//                     });
//                     return page;
//                 });
//                 return newData;
//             });

//             return { previousPosts };
//         },
//         onSuccess: () => {
//             toast.success("Bài viết đã được cập nhật!", {
//                 position: "bottom-right",
//                 richColors: true,
//                 duration: 3000,
//             })
//         },
//         onError: (err, newPost, context) => {
//             console.error("❌ Failed to edit post:", err);
//             queryClient.setQueryData(["posts", "newsfeed", "cursor-based"], context?.previousPosts);
//         },
//     })
// }