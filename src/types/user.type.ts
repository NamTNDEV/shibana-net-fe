import { RoleResponseDataType } from "./role.type"

export type UserResponseDataType = {
    userId: string
    email: string
    roles: RoleResponseDataType[]
    firstName: string
    lastName: string
    dob: string
    address: string
    phoneNumber: string | null
    avatar: string | null
}