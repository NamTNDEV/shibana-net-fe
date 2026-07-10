'use client'

import { ReactionType } from "@/constants/reaction-type";
import { cn } from "@/lib/utils";
import ReactionIcon from "./reaction-icon";

export type ReactionStatsProps = {
    topReactions: ReactionType[];
}
export function ReactionStats({ topReactions }: ReactionStatsProps) {
    if (!topReactions || topReactions.length === 0) return null;
    return (
        <div className="flex items-center px-3 py-2 cursor-pointer group">
            <div className="flex items-center">
                {topReactions.map((type, index) => (
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
                ))}
            </div>
        </div>
    )
}