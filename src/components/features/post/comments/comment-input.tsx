'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn, getInitialName } from "@/lib/utils";
import ProfileAvatarContainer from "../../profile/header/avatar/profile-avatar-container";
import { useAuthStore } from "@/stores/auth.store";
import CommentInputSkeleton from "./skeleton/comment-input-skeleton";
import { Send } from "lucide-react";
import { useState } from "react";
import { useCreateReplyCommentMutation, useCreateRootCommentMutation } from "@/hooks/tanstacks/mutations/use-comment-mutation";
import { CommentResponseDataType, CreateReplyCommentRequestBodyType, CreateRootCommentRequestBodyType } from "@/types/post.type";
import { usePostStatsStore } from "@/stores/post-stats.store";

type CommentInputProps = {
    postId: string;
    replyTargetId?: string;
    type?: "root" | "reply";
    onReplyCreatedSuccessfully?: (newReply: CommentResponseDataType) => void;
}

function CommentInput({ postId, replyTargetId, type = "root", onReplyCreatedSuccessfully }: CommentInputProps) {
    const { adjustCommentCount } = usePostStatsStore();
    const { authUser } = useAuthStore();

    const [commentContent, setCommentContent] = useState("");
    const [isFocussing, setIsFocussing] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            if (commentContent.trim()) {
                handleSubmit(e as unknown as React.FormEvent);
            }
        }
    };

    const handleSuccess = () => {
        setCommentContent("");
        adjustCommentCount(postId, 1);
    }

    const handleCreateReplySuccess = (newReply: CommentResponseDataType) => {
        if (!onReplyCreatedSuccessfully) {
            console.warn("onReplyCreatedSuccessfully is not provided. The new reply will not be added to the local state.");
            return;
        }
        adjustCommentCount(postId, 1);
        setCommentContent("");
        onReplyCreatedSuccessfully(newReply);
    }

    const {
        mutate: createComment,
        isPending: isCreatingComment,
    } = useCreateRootCommentMutation(handleSuccess)

    const {
        mutate: createReplyComment,
        isPending: isCreatingReplyComment,
    } = useCreateReplyCommentMutation(handleCreateReplySuccess)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentContent.trim()) return;
        // --- Create Root Comment ---
        if (type === "root") {
            const body: CreateRootCommentRequestBodyType = {
                content: commentContent,
            }
            createComment({
                body,
                postId: postId,
            })
        }

        // --- Create Reply Comment ---
        if (type === "reply") {
            if (!replyTargetId) return console.error("replyTargetId is required when type is 'reply'");
            const body: CreateReplyCommentRequestBodyType = {
                content: commentContent,
            }
            createReplyComment({
                body,
                commentTargetId: replyTargetId,
            })
        }
    }

    if (!authUser) {
        return (
            <CommentInputSkeleton />
        )
    }

    return (
        <div className="w-full flex gap-1.5">
            <div>
                <ProfileAvatarContainer
                    avatar={authUser.avatar}
                    initialName={getInitialName(authUser?.lastName, authUser?.firstName)}
                    avatarScale={authUser?.avatarScale || 1}
                    avatarPositionX={authUser?.avatarPositionX || 0}
                    avatarPositionY={authUser?.avatarPositionY || 0}
                    containerSize={32}
                />
            </div>

            <form
                className={cn(
                    "w-full flex flex-col gap-0 bg-gray-100 rounded-lg",
                    !isFocussing && !commentContent && "rounded-full"
                )}
                onSubmit={handleSubmit}
            >
                <Textarea
                    placeholder="Viết bình luận..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    onFocus={() => setIsFocussing(true)}
                    onBlur={() => setIsFocussing(false)}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "h-4 w-full px-3 pt-2 m-0 resize-none flex-1 min-h-9 max-h-[50vh] overflow-auto",
                        "outline-none border-none shadow-none bg-gray-100",
                        "leading-normal break-all whitespace-pre-wrap text-left",
                        "focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:border",
                        "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
                        !isFocussing && !commentContent && "rounded-full bg-gray-100"
                    )}
                    autoFocus={type === "root"}
                />
                {
                    (isFocussing || commentContent) && (
                        <div className="flex items-center gap-2 shrink-0 p-2 pt-0" >
                            <Button
                                type="submit"
                                className="size-9 ml-auto rounded-full bg-transparent hover:bg-gray-200 text-primary disabled:text-gray-600"
                                disabled={isCreatingReplyComment || isCreatingComment || commentContent.trim() === ""}
                            >
                                <Send className="text-8" />
                            </Button>
                        </div>
                    )
                }
            </form>
        </div>
    )
}

export default CommentInput;
