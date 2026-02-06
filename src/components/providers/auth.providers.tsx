'use client'

import { useAuthStore } from "@/stores/auth.store";
import { UserResponseDataType } from "@/types/user.type";
import { useLayoutEffect, useRef } from "react";

type AuthProvidersPropsType = {
    children: React.ReactNode;
    initialUser: UserResponseDataType | null;
}

export default function AuthProvider({ children, initialUser }: AuthProvidersPropsType) {
    const { setAuthUser } = useAuthStore();
    const isInitialized = useRef(false);

    useLayoutEffect(() => {
        if (isInitialized.current) return;
        setAuthUser(initialUser);
        isInitialized.current = true;
    }, [initialUser])

    return (
        <>{children}</>
    )
}