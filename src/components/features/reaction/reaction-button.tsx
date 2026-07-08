'use client'

import { ThumbsUp } from "lucide-react";
import { DisplayMode } from "../post/feeds/post-item";
import { cn } from "@/lib/utils";

export type ReactionButtonProps = {
    displayMode: DisplayMode;
    reactionCounts: number;
}

export function ReactionButton({ displayMode, reactionCounts }: ReactionButtonProps) {
    return (
        <div className={cn(
            "flex items-center gap-2 h-full px-3 hover:bg-muted cursor-pointer",
            displayMode === "NEWSFEED" && "rounded-bl-lg"
        )}>
            <ThumbsUp className="size-5" />
            {reactionCounts ? reactionCounts : ""}
        </div>
    )
}