'use client'

import { ReactionType } from "@/constants/reaction-type";

export type ReactionStatsProps = {
    topReactions: ReactionType[];
}
export function ReactionStats({ topReactions }: ReactionStatsProps) {
    if (!topReactions || topReactions.length === 0) return null;
    return (
        <div
            className="px-3"
        >
            asdf
        </div>
    )
}