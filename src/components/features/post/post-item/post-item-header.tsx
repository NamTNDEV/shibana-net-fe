'use client';

import { PostAuthorResponseDataType } from "@/types/post.type";
import { PrivacyType } from "../../profile/about/profile-about-item.type";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import ProfileAvatarContainer from "../../profile/header/avatar/profile-avatar-container";
import { formatDate } from "@/lib/utils";
import { getPrivacyIconByType } from "../../profile/about/about.utils";

export type PostHeaderProps = {
    author: PostAuthorResponseDataType;
    createdAt: string;
    privacy: PrivacyType;
}

export default function PostHeader({ author, createdAt, privacy }: PostHeaderProps) {
    const router = useRouter();

    const handleProfileAvatarClick = () => {
        router.push(ROUTES.USER.PROFILE.replace(":handle", author.username));
    }

    return (
        <div className="px-3 pt-3 flex items-center gap-2 mb-2">
            <Button
                variant="ghost"
                size="icon-lg"
                className="hover:bg-transparent hover:opacity-90"
                onClick={handleProfileAvatarClick}
            >
                <ProfileAvatarContainer
                    avatar={author.avatarMediaName}
                    initialName={author.displayName}
                    avatarScale={author.avatarScale || 1}
                    avatarPositionX={author.avatarPositionX || 0}
                    avatarPositionY={author.avatarPositionY || 0}
                    containerSize={40}
                />
            </Button>

            <div className="flex flex-col">
                <span className="text-[15px] font-semibold cursor-pointer hover:underline" onClick={handleProfileAvatarClick}>{author.displayName}</span>
                <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 hover:cursor-pointer hover:underline">{formatDate(createdAt, "dd/MM/yyyy HH:mm")}</span>
                    <span className="text-[10px] text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{getPrivacyIconByType(privacy, "size-3")}</span>
                </div>
            </div>
        </div>
    )
}