// Request

import { PrivacyType } from "@/components/features/profile/about/profile-about-item.type";
import { ReactionType } from "@/constants/reaction-type";

export type AuthorResponseDataType = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    avatarScale: number | null;
    avatarPositionX: number | null;
    avatarPositionY: number | null;
}

/**
 * POST TYPES
 */
// Response
export type PostResponseDataType = {
    id: string;
    content: string;
    createdAt: string;
    author: AuthorResponseDataType;
    privacy: PrivacyType;

    commentCounts: number;
    reactionCounts: number;
    topReactions: Record<ReactionType, number> | null;
    requesterReactionType: ReactionType | null;
}

// Request
export type CreatePostRequestBodyType = {
    content: string;
    privacy: PrivacyType;
}

export type EditPostRequestBodyType = {
    id: string;
    content: string;
    privacy: PrivacyType;
}

/**
 * COMMENT TYPES
 */
// Response
export type CommentResponseDataType = {
    author: AuthorResponseDataType;
    content: string;
    createdAt: string;
    id: string;
    isEdited: boolean;
    level: number;
    parentId: string | null;
    postId: string;
    reactionCounts: number;
    replyCount: number;
    requesterReactionType: ReactionType | null;
    topReactions: Record<ReactionType, number> | null;
}

// Request
export type CreateRootCommentRequestBodyType = {
    content: string;
}

export type EditCommentRequestBodyType = {
    newContent: string;
}

export type CreateReplyCommentRequestBodyType = {
    content: string;
}