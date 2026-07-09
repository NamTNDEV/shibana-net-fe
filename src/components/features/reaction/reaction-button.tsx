'use client'

import { useState, useRef } from "react";
import { DisplayMode } from "../post/feeds/post-item";
import { cn } from "@/lib/utils";
import { ReactionType } from "@/constants/reaction-type";
import { ReactionSelector } from "./reaction-selector";
import ReactionIcon from "./reaction-icon";

export type ReactionButtonProps = {
    displayMode: DisplayMode;
    reactionCounts: number;
    requesterReactionType: ReactionType | null;
}

export function ReactionButton({ displayMode, reactionCounts, requesterReactionType }: ReactionButtonProps) {
    const [showSelector, setShowSelector] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState<ReactionType | null>(requesterReactionType);

    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setShowSelector(true);
        }, 400);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setShowSelector(false);
    };

    const handleReactionSelect = (type: ReactionType) => {
        console.log("User đã chọn:", type);
        setSelectedReaction(type);
        setShowSelector(false);
    };

    return (
        <div
            className="relative flex items-center h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showSelector && (
                <ReactionSelector onSelectAction={handleReactionSelect} />
            )}

            <div
                className={cn(
                    "flex items-center gap-2 h-full px-3 hover:bg-muted cursor-pointer transition-colors",
                    displayMode === "NEWSFEED" && "rounded-bl-lg",
                    selectedReaction && "text-primary"
                )}
                onClick={() => {
                    console.log("Click nút Like trực tiếp");
                }}
            >
                <ReactionIcon
                    className="size-5"
                    type={selectedReaction || "LIKE"}
                    variant={selectedReaction ? "button-solid" : "button-outline"}
                />
                <span className="font-medium text-sm text-muted-foreground">
                    {reactionCounts ? reactionCounts : "Thích"}
                </span>
            </div>
        </div>
    )
}