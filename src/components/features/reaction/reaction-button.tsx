'use client'

import Lottie from "lottie-react";
import likeButtonAnimated from "./likeButtonAnimated.json";
import { DisplayMode } from "../post/feeds/post-item";
import { cn } from "@/lib/utils";
import { ReactionType } from "@/constants/reaction-type";

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
            <Lottie animationData={likeButtonAnimated} loop={false} style={{ width: 20, height: 20 }} />
            {reactionCounts ? reactionCounts : ""}
        </div>
    )
}