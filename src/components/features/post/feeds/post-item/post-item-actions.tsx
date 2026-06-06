'use client';

import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { DisplayMode } from ".";

export type PostActionsProps = {
    postId: string;
    commentCount: number;
    displayMode: DisplayMode;
}

export default function PostActions({ postId, commentCount, displayMode }: PostActionsProps) {
    const router = useRouter();

    const handleCommentButtonClick = () => {
        if (displayMode === "NEWSFEED") {
            router.push(ROUTES.POST.DETAIL.replace(":postId", postId), { scroll: false });
        } else if (displayMode === "MODAL_DETAIL") {

        }
    }

    return (
        <div className="h-11 flex items-center">
            <div className={cn(
                "flex items-center gap-2 h-full px-3 hover:bg-muted cursor-pointer",
                displayMode === "NEWSFEED" && "rounded-bl-lg"
            )}>
                <ThumbsUp className="size-5" />
                {commentCount ? commentCount : ""}
            </div>
            <div className="flex items-center gap-2 h-full px-3 hover:bg-muted cursor-pointer" onClick={handleCommentButtonClick}>
                <MessageCircle className="size-5" />
                {commentCount ? commentCount : ""}
            </div>
        </div>
    )
}