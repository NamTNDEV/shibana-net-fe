import { cn } from "@/lib/utils";
import { ThumbsUp } from "lucide-react";
import { DisplayMode } from ".";
import PostCommentStats from "./post-item-stats/post-comment-stats";

export type PostActionsProps = {
    postId: string;
    commentCount: number;
    displayMode: DisplayMode;
}

export default function PostActions({ postId, commentCount, displayMode }: PostActionsProps) {
    return (
        <div className="h-11 flex items-center">
            <div className={cn(
                "flex items-center gap-2 h-full px-3 hover:bg-muted cursor-pointer",
                displayMode === "NEWSFEED" && "rounded-bl-lg"
            )}>
                <ThumbsUp className="size-5" />
                {commentCount ? commentCount : ""}
            </div>

            <PostCommentStats postId={postId} commentCount={commentCount} displayMode={displayMode} />
        </div>
    )
}