import { PrivacyType } from "@/components/features/profile/about/profile-about-item.type"

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
    address: ProfileFieldWithPrivacyResponseDataType<any>;
    phoneNumber: ProfileFieldWithPrivacyResponseDataType<any>;

    avatar: string | null
    avatarScale: number
    avatarPositionX: number
    avatarPositionY: number

    cover: string | null
    coverPositionY: number
}
