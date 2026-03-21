import { AboutItemType, PrivacyType } from "@/components/features/profile/about/profile-about-item.type"
import { FriendshipStatusResponseType } from "@/constants/connection"

// Request
export type UpdateCoverImageRequestBodyType = {
    coverMediaName?: string
    coverPositionY: number
}

export type UpdateAvatarImageRequestBodyType = {
    avatarMediaName?: string
    avatarScale: number
    avatarPositionX: number
    avatarPositionY: number
}

export type ProfileUpdateRequestBodyType = {
    privacyLevel: PrivacyType;
    fieldKey: AboutItemType;
    content: string | null;
}

// Response
export type ProfileFieldWithPrivacyResponseDataType<T> = {
    value: T | null;
    privacyLevel: PrivacyType;
}

export type ProfileResponseDataType = {
    userId: string
    username: string

    firstName: string
    lastName: string

    bio: ProfileFieldWithPrivacyResponseDataType<any>;
    dob: ProfileFieldWithPrivacyResponseDataType<any>;
    email: ProfileFieldWithPrivacyResponseDataType<any>;
    address: ProfileFieldWithPrivacyResponseDataType<any>;
    phoneNumber: ProfileFieldWithPrivacyResponseDataType<any>;

    avatar: string | null
    avatarScale: number
    avatarPositionX: number
    avatarPositionY: number

    cover: string | null
    coverPositionY: number

    viewerContext: ViewerContextResponseDataType;
}

export type RelationshipContext = {
    isFollowing: boolean;
    friendshipStatus: FriendshipStatusResponseType;
}

export type ViewerContextResponseDataType = {
    isOwner: boolean;
    relationshipContext: RelationshipContext;
}
