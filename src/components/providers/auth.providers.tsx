'use client'

import { useAuthStore } from "@/stores/auth.store";
import { UserResponseDataType } from "@/types/user.type";
import { useEffect } from "react";

type AuthProvidersPropsType = {
    children: React.ReactNode;
    initialUser: UserResponseDataType | null;
}

export default function AuthProvider({ children, initialUser }: AuthProvidersPropsType) {
    const { setAuthUser } = useAuthStore();

    useEffect(() => {
        setAuthUser(initialUser);
    }, [initialUser, setAuthUser])

    return (
        <>{children}</>
    )
}