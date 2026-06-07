'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn, getInitialName } from "@/lib/utils";
import ProfileAvatarContainer from "../../profile/header/avatar/profile-avatar-container";
import { useAuthStore } from "@/stores/auth.store";
import CommentInputSkeleton from "./skeleton/comment-input-skeleton";
import { Send } from "lucide-react";
import { useState } from "react";

type CommentInputProps = {
    postId: string;
}

function CommentInput({ postId }: CommentInputProps) {
    const { authUser } = useAuthStore();
    const [commentContent, setCommentContent] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            if (commentContent.trim()) {
                handleSubmit(e as unknown as React.FormEvent);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting comment:", commentContent);
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

            <form className="w-full flex flex-col gap-0 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
                <Textarea
                    placeholder="Viết bình luận..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "w-full px-3 pt-2 m-0 resize-none flex-1 min-h-9 max-h-[50vh] overflow-auto",
                        "outline-none border-none shadow-none bg-gray-100",
                        "leading-normal break-all whitespace-pre-wrap text-left",
                        "focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:border",
                        "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                    )}
                    autoFocus
                />
                <div className="flex items-center gap-2 shrink-0 p-2 pt-0" >
                    <Button
                        type="submit"
                        className="size-9 ml-auto rounded-full bg-transparent hover:bg-gray-200 text-primary disabled:text-gray-600"
                        disabled={commentContent.trim() === ""}
                    >
                        <Send className="text-8" />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CommentInput;
