'use client'
import { Button } from "@/components/ui/button";
import { FRIENDSHIP_STATUS, FriendshipStatusResponseType } from "@/constants/connection";
import { UserCheck, UserPlus, UserX } from "lucide-react";

export type FriendButtonPropsType = {
    friendshipStatus: FriendshipStatusResponseType;
}

const handler1 = () => {
    console.log("handler1");
}
const handler2 = () => {
    console.log("handler2");
}
const handler3 = () => {
    console.log("handler3");
}
const handler4 = () => {
    console.log("handler4");
}

const map: Map<FriendshipStatusResponseType, { title: string, icon: React.ReactNode, onClick: () => void }> = new Map([
    [FRIENDSHIP_STATUS.NONE, {
        title: "Thêm bạn bè",
        icon: <UserPlus className="size-4" />,
        onClick: handler1,
    }],
    [FRIENDSHIP_STATUS.SENT_REQUEST, {
        title: "Huỷ lời mời",
        onClick: handler2,
        icon: <UserX className="size-4" />,
    }],
    [FRIENDSHIP_STATUS.RECEIVED_REQUEST, {
        title: "Phản hồi",
        onClick: handler3,
        icon: <UserCheck className="size-4" />,
    }],
    [FRIENDSHIP_STATUS.FRIENDED, {
        title: "Bạn bè",
        onClick: handler4,
        icon: <UserCheck className="size-4" />,
    }],
]);

export default function FriendButton({ friendshipStatus }: FriendButtonPropsType) {
    const { title, icon, onClick } = map.get(friendshipStatus) as { title: string, icon: React.ReactNode, onClick: () => void };
    return (
        <Button
            className="flex items-center justify-center gap-1 px-3 h-9 hover:opacity-80"
            variant="outline"
            onClick={onClick}
        >
            <span className="flex items-center gap-1">
                {icon}
                {title}
            </span>
        </Button>
    )
}
