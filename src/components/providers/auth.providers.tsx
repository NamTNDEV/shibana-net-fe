'use client'

import { useAuthStore } from "@/stores/auth.store";
import { UserResponseDataType } from "@/types/user.type";
import { useEffect, useRef } from "react";

type AuthProvidersPropsType = {
    children: React.ReactNode;
    initialUser: UserResponseDataType | null;
}

export default function AuthProvider({ children, initialUser }: AuthProvidersPropsType) {
    const { setAuthUser, logout } = useAuthStore();
    const isInitialized = useRef(false);

    if (!isInitialized.current) {
        if (initialUser) {
            setAuthUser(initialUser);
        } else {
            logout();
        }
        isInitialized.current = true;
    }

    useEffect(() => {
        if (initialUser) {
            setAuthUser(initialUser);
        } else {
            logout();
        }
    }, [initialUser, setAuthUser, logout]);

    return (
        <>{children}</>
    )
}