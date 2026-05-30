// Request

import { PrivacyType } from "@/components/features/profile/about/profile-about-item.type";

// Response
export type PostAuthorResponseDataType = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
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