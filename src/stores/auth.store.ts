import { MyAccountMetadataResponseDataType } from "@/types/user.type"
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type AuthStoreType = {
    authUser: MyAccountMetadataResponseDataType | null;
    logout: () => void;
    setAuthUser: (user: MyAccountMetadataResponseDataType | null) => void;
}

export const useAuthStore = create<AuthStoreType>()(
    devtools(
        (set) => ({
            authUser: null,
            logout: () => set({ authUser: null }),
            setAuthUser: (user: MyAccountMetadataResponseDataType | null) => set({ authUser: user })
        }),
        { name: "AuthStore" }
    )
)