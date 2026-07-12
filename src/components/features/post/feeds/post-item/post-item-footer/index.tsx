import { ReactionType } from "@/constants/reaction-type";
import { DisplayMode } from "..";
import { PostActionButtons } from "./actions-buttons";
import { ReactionStats } from "@/components/features/reaction/reaction-stats";

export type PostFooterProps = {
    postId: string;
    commentCount: number;
    reactionCounts: number;
    topReactions: Record<ReactionType, number> | null;
    requesterReactionType: ReactionType | null;
    displayMode: DisplayMode;
}

export default function PostFooter({ postId, commentCount, reactionCounts, topReactions, requesterReactionType, displayMode }: PostFooterProps) {
    return (
        <div className="h-11 flex items-center justify-between">
            <PostActionButtons
                postId={postId}
                commentCount={commentCount}
                reactionCounts={reactionCounts}
                requesterReactionType={requesterReactionType}
                displayMode={displayMode}
            />

            <ReactionStats topReactions={topReactions} />
        </div>
    )
}

