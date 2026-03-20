'use client'

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { getUrlWithParams } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import FollowButton from "../follow/follow-button";
import { ViewerContextResponseDataType } from "@/types/profile.type";

export type ProfileActionsPropsType = {
    username: string;
    viewerContext: ViewerContextResponseDataType;
    userId: string;
}
export default function ProfileActions({ username, viewerContext, userId }: ProfileActionsPropsType) {
    return (
        <div className="flex gap-2 md:pt-3 lg:pt-0">
            {viewerContext.isOwner ? <ProfileActionsOwner username={username} /> : <ProfileActionsNotOwner userId={userId} isFollowing={viewerContext.relationshipContext.isFollowing} />}
        </div>
    )
}

function ProfileActionsOwner({ username }: { username: string }) {
    const router = useRouter();

    const handleEditProfileButtonClick = () => {
        const editUrl = getUrlWithParams(ROUTES.USER.EDIT, { handle: username });
        router.push(editUrl);
    }

    return (
        <div>
            <Button className="flex items-center gap-1" variant="outline" onClick={handleEditProfileButtonClick}>
                <Pencil className="size-4" />
                Chỉnh sửa
            </Button>
        </div>
    )
}

function ProfileActionsNotOwner({ userId, isFollowing }: { userId: string, isFollowing: boolean }) {
    return (
        <FollowButton followeeUserId={userId} isFollowing={isFollowing} />
    )
}