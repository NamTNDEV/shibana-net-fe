import { UserResponseDataType } from "@/types/user.type"
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type AuthStoreType = {
    authUser: UserResponseDataType | null;
    isHydrated: boolean;
    logout: () => void;
    setAuthUser: (user: UserResponseDataType | null) => void;
}

export const useAuthStore = create<AuthStoreType>()(
    devtools(
        (set) => ({
            authUser: null,
            isHydrated: false,
            logout: () => set({ authUser: null, isHydrated: true }, false, "logout"),
            setAuthUser: (user: UserResponseDataType | null) => set({ authUser: user, isHydrated: true }, false, "setAuthUser")
        }),
        { name: "AuthStore" }
    )
)