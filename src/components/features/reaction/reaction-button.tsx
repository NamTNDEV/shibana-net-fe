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

    const [animateTrigger, setAnimateTrigger] = useState(0);

    const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }

        openTimeoutRef.current = setTimeout(() => {
            setShowSelector(true);
        }, 400);
    };

    const handleMouseLeave = () => {
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
        }

        closeTimeoutRef.current = setTimeout(() => {
            setShowSelector(false);
        }, 400);
    };

    const handleReactionSelect = (type: ReactionType, isDirectClick?: boolean) => {
        setAnimateTrigger((prev) => prev + 1);

        if (isDirectClick && selectedReaction) {
            setSelectedReaction(null);
        } else {
            setSelectedReaction(type);
        }
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
                onClick={() => handleReactionSelect("LIKE", true)}
            >
                <div
                    key={animateTrigger}
                    className={cn(animateTrigger > 0 && selectedReaction && "animate-reaction-pop")}
                >
                    <ReactionIcon
                        className="size-5"
                        type={selectedReaction || "LIKE"}
                        variant={selectedReaction ? "button-solid" : "button-outline"}
                    />
                </div>

                <span className="font-medium text-sm text-muted-foreground">
                    {reactionCounts ? reactionCounts : "Thích"}
                </span>
            </div>
        </div>
    )
}