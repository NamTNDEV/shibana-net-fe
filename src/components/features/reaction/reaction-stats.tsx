'use client'

import { cn } from "@/lib/utils";
import ReactionIcon from "./reaction-icon";
import { ReactionTargetType, ReactionType } from "@/constants/reaction-type";

export type ReactionStatsProps = {
    topReactions: Record<ReactionType, number> | null;
    targetType?: ReactionTargetType;
}

const mapping = (topReactions: Record<ReactionType, number>) => {
    return Object.keys(topReactions).slice(0, 3) as ReactionType[];
}

export function ReactionStats({ topReactions, targetType = "POST" }: ReactionStatsProps) {
    if (!topReactions) return null;
    return (
        <div className={cn(
            "flex items-center mx-2 my-1 p-1 cursor-pointer",
            targetType === "COMMENT" && "hover:bg-gray-200 rounded-lg",
        )}>
            <div className="flex items-center">
                {mapping(topReactions).map((type, index) => {
                    if (index > 2) return null;
                    return (
                        <div
                            key={type}
                            className={cn(
                                "relative",
                                index > 0 && "-ml-0.2"
                            )}
                            style={{ zIndex: 10 - index }}
                        >
                            <ReactionIcon
                                type={type}
                                variant="static"
                                className={cn(
                                    "rounded-full ring-2 ring-white",
                                    targetType === "POST" && "size-4.5 transition-transform hover:scale-110",
                                    targetType === "COMMENT" && "size-4"
                                )}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
