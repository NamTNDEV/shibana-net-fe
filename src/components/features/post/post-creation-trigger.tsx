'use client';

import { useAuthStore } from "@/stores/auth.store";
import ProfileAvatarContainer from "../profile/header/avatar/profile-avatar-container";
import { getInitialName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Clapperboard, Images } from "lucide-react";

export default function PostCreationTrigger() {
    const router = useRouter();
    const { authUser } = useAuthStore();

    if (!authUser) return <PostCreationTriggerSkeleton />;

    const handleProfileAvatarClick = () => {
        router.push(ROUTES.USER.PROFILE.replace(":handle", authUser.username));
    }

    return (
        <div className="w-full bg-white rounded-lg shadow-sm p-3 px-4 flex items-center justify-between gap-2">
            <Button
                variant="ghost"
                size="icon-lg"
                className="hover:bg-transparent hover:opacity-90"
                onClick={handleProfileAvatarClick}
            >
                <ProfileAvatarContainer
                    avatar={authUser.avatar}
                    initialName={getInitialName(authUser.firstName, authUser.lastName)}
                    avatarScale={authUser.avatarScale || 1}
                    avatarPositionX={authUser.avatarPositionX || 0}
                    avatarPositionY={authUser.avatarPositionY || 0}
                    containerSize={40}
                />
            </Button>

            <div
                className="h-10 px-4 py-2 flex-1 rounded-full bg-muted hover:bg-secondary cursor-pointer flex items-center justify-start"
                onClick={() => {
                    alert("Post creation clicked");
                }}
            >
                <p className="text-base">{authUser.firstName} ơi, bạn đang nghĩ gì thế?</p>
            </div>

            <div className="flex items-center">
                <div className="size-10 p-2 rounded-sm hover:bg-muted cursor-pointer flex items-center justify-center">
                    <Images className="size-6" color="#00a90b" />
                </div>
                <div className="size-10 p-2 rounded-sm hover:bg-muted cursor-pointer flex items-center justify-center">
                    <Clapperboard className="size-6" color="#f10e30" />
                </div>
            </div>
        </div>
    )
}

const PostCreationTriggerSkeleton = () => {
    return (
        <div className="w-full bg-white rounded-lg shadow-sm p-3 px-4 flex items-center justify-between gap-2">
            <div className="size-10 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="h-10 flex-1 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="flex items-center gap-2">
                <div className="size-10 bg-gray-200 animate-pulse rounded-sm"></div>
                <div className="size-10 bg-gray-200 animate-pulse rounded-sm"></div>
            </div>
        </div>
    )
}