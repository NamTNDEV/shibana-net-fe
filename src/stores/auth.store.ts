import { UserResponseDataType } from "@/types/user.type"
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type AuthStoreType = {
    authUser: UserResponseDataType | null;
    setAuthUser: (user: UserResponseDataType | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStoreType>()(
    devtools(
        (set) => ({
            authUser: null,
            setAuthUser: (user: UserResponseDataType | null) => set({ authUser: user }, false, "setAuthUser"),
            logout: () => set({ authUser: null }, false, "logout"),
        }),
        { name: "AuthStore" }
    )
)