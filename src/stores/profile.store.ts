import { ProfileResponseDataType } from "@/types/profile.type";
import { create } from "zustand"
import { devtools } from "zustand/middleware";

export type ProfileStoreType = {
    profile: ProfileResponseDataType | null;
    setProfile: (profile: ProfileResponseDataType) => void;
}

export const useProfileStore = create<ProfileStoreType>()(
    devtools(
        (set) => ({
            profile: null,
            setProfile: (profile: ProfileResponseDataType) => set({ profile }),
        }),
        { name: "ProfileStore" }
    )
)