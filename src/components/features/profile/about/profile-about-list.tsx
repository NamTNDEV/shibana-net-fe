'use client'
import { AboutItem } from "./profile-about-item"
import { useProfileStore } from "@/stores/profile.store"
import { AboutItemRenderListType } from "./profile-about-item.type"
import { checkIsOwner } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth.store"
import { generateAboutItemList } from "./about.utils"
import ProfileAboutListSkeleton from "./profile-about-skeleton"

type AboutListPropType = {
    renderListType: AboutItemRenderListType;
}

export const AboutList = ({ renderListType }: AboutListPropType) => {
    const { authUser } = useAuthStore();
    const { profile } = useProfileStore();

    if (!profile) return (
        <ProfileAboutListSkeleton />
    );

    const isOwner = checkIsOwner(authUser?.userId, profile?.userId);
    const renderList = generateAboutItemList(authUser, profile, renderListType);

    return (
        <ul className="flex flex-col gap-2">
            {
                renderList.map((item) => (
                    <AboutItem
                        key={item.type}
                        type={item.type}
                        title={item.title}
                        content={item.content}
                        privacy={item.privacy}
                        isOwner={isOwner}
                    />
                ))
            }
        </ul>
    )
}