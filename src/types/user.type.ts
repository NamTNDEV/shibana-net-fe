import { RoleResponseDataType } from "./role.type"

export type MyAccountMetadataResponseDataType = {
    userId: string
    email: string
    username: string
    roles: RoleResponseDataType[]
    firstName: string
    lastName: string
    dob: string
    address: string
    phoneNumber: string | null
    avatar: string | null
    bio: string | null
    cover: string | null
}