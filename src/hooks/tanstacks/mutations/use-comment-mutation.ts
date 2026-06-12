'use client';

import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { useAuthStore } from "@/stores/auth.store";
import { CommentResponseDataType, CreateRootCommentRequestBodyType, CreatePostRequestBodyType, EditPostRequestBodyType, PostResponseDataType, EditCommentRequestBodyType, CreateReplyCommentRequestBodyType } from "@/types/post.type";
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
                postId,
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

export const useCreateReplyCommentMutation = (onCreateSuccess: (newReply: CommentResponseDataType) => void) => {
    return useMutation({
        mutationFn: async ({ body, commentTargetId }: { body: CreateReplyCommentRequestBodyType, commentTargetId: string }) => {
            const response = await fetch(NEXT_SERVER_ROUTES.COMMENTS.CREATE_REPLY_COMMENT
                .replace(":commentId", commentTargetId),
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

            if (!response.ok) {
                throw new Error("Lỗi khi tạo phản hồi");
            }

            return await response.json() as ResponseDataType<CommentResponseDataType>;
        },
        onSuccess: (data, newComment, context) => {
            const createdComment = data.data;
            onCreateSuccess(createdComment);
            toast.success("Bình luận đã được đăng!", {
                position: "bottom-right",
                richColors: true,
                duration: 3000,
            })
        },
        onError: (err, newComment, context) => {
            console.error("Lỗi tạo reply:", err);
        },
    })
}

export const useEditCommentMutation = (onEditSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ body, commentId, postId }: { body: EditCommentRequestBodyType, commentId: string, postId: string }) => {
            const response = await fetch(NEXT_SERVER_ROUTES.COMMENTS.UPDATE_COMMENT.replace(":commentId", commentId), {
                method: "PUT",
                body: JSON.stringify(body),
            });
            return await response.json() as ResponseDataType<null>;
        },
        onMutate: async ({ body, commentId, postId }: { body: EditCommentRequestBodyType, commentId: string, postId: string }) => {
            onEditSuccess();
            await queryClient.cancelQueries({ queryKey: ["comments", "list", "cursor-based", postId] });
            const previousComments = queryClient.getQueryData(["comments", "list", "cursor-based", postId]);
            queryClient.setQueryData(["comments", "list", "cursor-based", postId], (oldData: any) => {
                if (!oldData || !oldData.pages) return oldData;
                const newData = JSON.parse(JSON.stringify(oldData));

                newData.pages = newData.pages.map((page: any) => {
                    page.payload = page.payload.map((comment: any) => {
                        if (comment.id === commentId) {
                            return {
                                ...comment,
                                content: body.newContent,
                                isEdited: true,
                            };
                        }
                        return comment;
                    });
                    return page;
                });
                return newData;
            });
            return { previousComments };
        },
        onSuccess: () => {
            toast.success("Bình luận đã được cập nhật!", {
                position: "bottom-right",
                richColors: true,
                duration: 3000,
            })
        },
        onError: (err, newComment, context) => {
            console.error("❌ Failed to edit comment:", err);
            queryClient.setQueryData(["comments", "list", "cursor-based", newComment.postId], context?.previousComments);
        },
    })
}