'use client'
import { useAuthStore } from "@/stores/auth.store";
import { UserResponseDataType } from "@/types/user.type";
import { useEffect } from "react";

type AuthHydratePropsType = {
    user: UserResponseDataType | null;
}
export default function AuthHydrate({ user }: AuthHydratePropsType) {
    const { setAuthUser } = useAuthStore();

    useEffect(() => {
        setAuthUser(user);
    }, [user, setAuthUser]);
    return null;
}
