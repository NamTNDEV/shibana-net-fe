import { RoleType } from './../constants/roles';
import { UserResponseDataType } from "@/types/user.type";

export type CheckHasPermissionParamsType = {
    user: UserResponseDataType | null;
    roles: RoleType[];
}
export const checkHasPermission = ({ user, roles }: CheckHasPermissionParamsType): boolean => {
    if (!user || !user.roles) return false;
    if (roles.length === 0) return true;
    const userRoles = user.roles.map(role => role.name) as RoleType[];
    return roles.some(role => userRoles.includes(role));
}