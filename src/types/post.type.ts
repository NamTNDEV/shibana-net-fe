// Request

import { PrivacyType } from "@/components/features/profile/about/profile-about-item.type";

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
    author: AuthorResponseDataType;
    privacy: PrivacyType;
    createdAt: string;
    commentCount: number;
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
    id: string;
    parentId: string | null;
    postId: string;
    level: number;
    content: string;
    createdAt: string;
    replyCount: number;
    isEdited: boolean;
    author: AuthorResponseDataType;
}

// Request
export type CreateRootCommentRequestBodyType = {
    content: string;
}

export type EditCommentRequestBodyType = {
    newContent: string;
}