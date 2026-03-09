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
export type ProfileResponseDataType = {
    userId: string

    firstName: string
    lastName: string
    bio: string | null

    dob: string
    address: string | null
    phoneNumber: string | null

    avatar: string | null
    avatarScale: number
    avatarPositionX: number
    avatarPositionY: number

    cover: string | null
    coverPositionY: number
}
