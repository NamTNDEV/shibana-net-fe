'use client'

import { useState, useRef } from "react";
import { DisplayMode } from "../post/feeds/post-item";
import { cn } from "@/lib/utils";
import { ReactionTargetType, ReactionType } from "@/constants/reaction-type";
import { ReactionSelector } from "./reaction-selector";
import ReactionIcon from "./reaction-icon";
import { useToggleReactionMutation } from "@/hooks/tanstacks/mutations/use-reaction-mutation";

export type ReactionButtonProps = {
    displayMode: DisplayMode;
    reactionCounts: number;
    requesterReactionType: ReactionType | null;
    targetId: string;
    targetType: ReactionTargetType;
    queryKey: any[];
}

export function ReactionButton({ displayMode, reactionCounts, requesterReactionType, targetId, targetType, queryKey }: ReactionButtonProps) {
    const [showSelector, setShowSelector] = useState(false);
    const [animateTrigger, setAnimateTrigger] = useState(0);

    const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { mutate: toggleReaction } = useToggleReactionMutation({
        targetId,
        targetType,
        queryKey
    });

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

    const handleReactionSelect = (type: ReactionType, isDirectClick: boolean = false) => {
        setShowSelector(false);
        if (!isDirectClick && requesterReactionType === type) return;

        let finalReactionType: ReactionType = type;
        if (isDirectClick && requesterReactionType) {
            finalReactionType = requesterReactionType;
        }
        setAnimateTrigger((prev) => prev + 1);
        toggleReaction(finalReactionType);
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
                    requesterReactionType && "text-primary"
                )}
                onClick={() => handleReactionSelect("LIKE", true)}
            >
                <div
                    key={animateTrigger}
                    className={cn(animateTrigger > 0 && requesterReactionType && "animate-reaction-pop")}
                >
                    <ReactionIcon
                        className="size-5"
                        type={requesterReactionType || "LIKE"}
                        variant={requesterReactionType ? "button-solid" : "button-outline"}
                    />
                </div>

                <span className="font-medium text-sm text-muted-foreground">
                    {reactionCounts}
                </span>
            </div>
        </div>
    )
}