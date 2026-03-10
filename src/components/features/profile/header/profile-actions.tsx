'use client'

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { getUrlWithParams } from "@/lib/utils";
import { useRouter } from "next/navigation";

export type ProfileActionsPropsType = {
    username: string;
    isOwner: boolean;
}
export default function ProfileActions({ username, isOwner }: ProfileActionsPropsType) {
    return (
        <div className="flex gap-2 md:pt-3 lg:pt-0">
            {isOwner ? <ProfileActionsOwner username={username} /> : <ProfileActionsNotOwner />}
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
            <Button variant="outline" onClick={handleEditProfileButtonClick}>
                Chỉnh sửa
            </Button>
        </div>
    )
}

function ProfileActionsNotOwner() {
    return (
        <div>
            <Button>
                Theo dõi
            </Button>
        </div>
    )
}