'use client'
import { useAuthStore } from "@/stores/auth.store";
import { MyAccountMetadataResponseDataType } from "@/types/user.type";
import { useEffect } from "react";

type AuthHydratePropsType = {
    user: MyAccountMetadataResponseDataType | null;
}
export default function AuthHydrate({ user }: AuthHydratePropsType) {
    const { setAuthUser } = useAuthStore();

    useEffect(() => {
        setAuthUser(user);
    }, [user, setAuthUser]);
    return null;
}
