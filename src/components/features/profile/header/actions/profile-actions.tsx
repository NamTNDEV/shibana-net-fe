'use client'

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { getUrlWithParams } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import FollowButton from "./buttons/follow-button";
import { RelationshipContext, ViewerContextResponseDataType } from "@/types/profile.type";
import MessageButton from "./buttons/message-button";
import FriendButton from "./buttons/friend-button";
import { useAuthStore } from "@/stores/auth.store";
import { FRIENDSHIP_STATUS } from "@/constants/connection";

export type ProfileActionsPropsType = {
    username: string;
    viewerContext: ViewerContextResponseDataType;
    userId: string;
}
export default function ProfileActions({ username, viewerContext, userId }: ProfileActionsPropsType) {
    const { authUser } = useAuthStore();
    if (!authUser) {
        return null;
    }
    return (
        <div className="flex gap-2 md:pt-3 lg:pt-0">
            {
                viewerContext.isOwner ?
                    <ProfileActionsOwner username={username} />
                    :
                    <ProfileActionsNotOwner
                        userId={userId}
                        relationshipContext={viewerContext.relationshipContext} />}
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
            <Button className="flex items-center gap-1 px-3 h-9 hover:bg-secondary" variant="outline" onClick={handleEditProfileButtonClick}>
                <Pencil className="size-4" />
                Chỉnh sửa
            </Button>
        </div>
    )
}

function ProfileActionsNotOwner({ userId, relationshipContext }: { userId: string, relationshipContext: RelationshipContext }) {
    const { isFollowing, friendshipStatus } = relationshipContext;
    return (
        <div className="flex items-center gap-2">
            <FollowButton followeeUserId={userId} isFollowing={isFollowing} />
            <MessageButton />
            {
                friendshipStatus !== FRIENDSHIP_STATUS.BE_REJECTED && <FriendButton friendshipStatus={friendshipStatus} />
            }
        </div>
    )
}