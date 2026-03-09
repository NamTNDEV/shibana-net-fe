import { RoleResponseDataType } from "./role.type"

export type MyAccountMetadataResponseDataType = {
    userId: string
    email: string
    username: string
    roles: RoleResponseDataType[]
    firstName: string
    lastName: string
    avatar: string | null
    avatarScale: number
    avatarPositionX: number
    avatarPositionY: number
}