'use client'

import { DisplayMode } from "../post/feeds/post-item";
import { cn } from "@/lib/utils";
import { ReactionType } from "@/constants/reaction-type";
import ReactionIcon from "./reaction-icon";

export type ReactionButtonProps = {
    displayMode: DisplayMode;
    reactionCounts: number;
    requesterReactionType: ReactionType | null;
}

export function ReactionButton({ displayMode, reactionCounts, requesterReactionType }: ReactionButtonProps) {
    return (
        <div className={cn(
            "flex items-center gap-2 h-full px-3 hover:bg-muted cursor-pointer",
            displayMode === "NEWSFEED" && "rounded-bl-lg"
        )}>
            <ReactionIcon
                className="size-5"
                type={requesterReactionType || "LIKE"}
                variant={requesterReactionType ? "button-solid" : "button-outline"}
            />
            {reactionCounts ? reactionCounts : ""}
        </div>
    )
}