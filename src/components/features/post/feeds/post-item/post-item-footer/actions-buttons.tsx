import { ReactionButton } from "@/components/features/reaction/reaction-button"
import { PostFooterProps } from "."
import CommentButton from "../post-comment-stats"

export type PostActionButtonsProps = Omit<PostFooterProps, "topReactions">
export function PostActionButtons({ postId, commentCount, reactionCounts, requesterReactionType, displayMode }: PostActionButtonsProps) {
    return (
        <div className="flex items-center h-full">
            <ReactionButton displayMode={displayMode} reactionCounts={reactionCounts} />
            <CommentButton postId={postId} commentCount={commentCount} displayMode={displayMode} />
        </div>
    )
}