import { UserResponseDataType } from "@/types/user.type"
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type AuthStoreType = {
    authUser: UserResponseDataType | null;
    logout: () => void;
    setAuthUser: (user: UserResponseDataType | null) => void;
}

export const useAuthStore = create<AuthStoreType>()(
    devtools(
        (set) => ({
            authUser: null,
            logout: () => set({ authUser: null }),
            setAuthUser: (user: UserResponseDataType | null) => set({ authUser: user })
        }),
        { name: "AuthStore" }
    )
)