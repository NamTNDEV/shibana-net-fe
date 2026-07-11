'use client'

import { cn } from "@/lib/utils";
import ReactionIcon from "./reaction-icon";
import { ReactionType } from "@/constants/reaction-type";

export type ReactionStatsProps = {
    topReactions: Record<ReactionType, number> | null;
}

const mapping = (topReactions: Record<ReactionType, number>) => {
    return Object.keys(topReactions).slice(0, 3) as ReactionType[];
}

export function ReactionStats({ topReactions }: ReactionStatsProps) {
    if (!topReactions) return null;
    return (
        <div className="flex items-center px-3 py-2 cursor-pointer group">
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
                                className="size-4.5 rounded-full ring-2 ring-white transition-transform hover:scale-110"
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
