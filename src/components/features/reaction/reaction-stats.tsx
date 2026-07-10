'use client'

import { cn } from "@/lib/utils";
import ReactionIcon from "./reaction-icon";
import type { TopReactionResponseDataType } from "@/types/post.type";
import { ReactionType } from "@/constants/reaction-type";

export type ReactionStatsProps = {
    topReactions: TopReactionResponseDataType[];
}

const mapping = (topReactions: TopReactionResponseDataType[]) => {
    const result: ReactionType[] = [];
    for (const reactionTypeString of Object.keys(topReactions)) {
        const reactionType = reactionTypeString as ReactionType;
        result.push(reactionType);
    }

    return result;
}

export function ReactionStats({ topReactions }: ReactionStatsProps) {
    if (!topReactions || topReactions.length === 0) return null;
    mapping(topReactions);
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
