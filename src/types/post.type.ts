// Request

import { PrivacyType } from "@/components/features/profile/about/profile-about-item.type";

// Response
export type PostAuthorResponseDataType = {
    userId: string;
    username: string;
    displayName: string;
    avatarMediaName: string | null;
    avatarScale: number | null;
    avatarPositionX: number | null;
    avatarPositionY: number | null;
}

export type PostResponseDataType = {
    id: string;
    content: string;
    author: PostAuthorResponseDataType;
    privacy: PrivacyType;
    createdAt: string;
    commentCount: number;
}