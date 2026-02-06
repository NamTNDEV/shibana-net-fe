'use client'

import { RoleType } from "@/constants/roles";
import { checkHasPermission } from "@/lib/permissions";
import { useAuthStore } from "@/stores/auth.store";

type RoleGuardPropsType = {
    children: React.ReactNode;
    allowedRoles: RoleType[];
    fallbackChildren?: React.ReactNode;
}

export default function RoleGuard({ children, allowedRoles, fallbackChildren }: RoleGuardPropsType) {
    const { authUser } = useAuthStore();
    const hasPermission = checkHasPermission({ user: authUser, roles: allowedRoles });

    if (!hasPermission) {
        return <>
            {fallbackChildren || null}
        </>
    }

    return (
        <>
            {children}
        </>
    )
}
