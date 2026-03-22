import { acceptFriendRequestAction, rejectFriendRequestAction, revokeFriendRequestAction, sendFriendRequestAction, unfriendAction } from "@/actions/connect.action";
import { FRIENDSHIP_STATUS, FriendshipStatusResponseType } from "@/constants/connection";
import { ActionResponseDataType } from "@/types/response.type";
import { UserCheck, UserPlus, UserX } from "lucide-react";

export const FRIEND_REQUEST_RESPOND_TYPE = {
    ACCEPT: "ACCEPT",
    REJECT: "REJECT",
} as const;

export type FriendRequestRespondType = (typeof FRIEND_REQUEST_RESPOND_TYPE)[keyof typeof FRIEND_REQUEST_RESPOND_TYPE];

export type FriendButtonContextType = {
    title: string;
    icon: React.ReactNode;
    onClick: (recieverId: string, respondType?: FriendRequestRespondType) => Promise<ActionResponseDataType<void>>;
}

export const BUTTON_CONTEXT_MAP: Map<FriendshipStatusResponseType, FriendButtonContextType> = new Map([
    [FRIENDSHIP_STATUS.NONE, {
        title: "Thêm bạn bè",
        icon: <UserPlus className="size-4" />,
        onClick: (id) => sendFriendRequestAction(id),
    }],
    [FRIENDSHIP_STATUS.SENT_REQUEST, {
        title: "Huỷ lời mời",
        onClick: (id) => revokeFriendRequestAction(id),
        icon: <UserX className="size-4" />,
    }],
    [FRIENDSHIP_STATUS.RECEIVED_REQUEST, {
        title: "Phản hồi",
        onClick: (id, respondType) => respondType === FRIEND_REQUEST_RESPOND_TYPE.ACCEPT ? acceptFriendRequestAction(id) : rejectFriendRequestAction(id),
        icon: <UserCheck className="size-4" />,
    }],
    [FRIENDSHIP_STATUS.FRIENDED, {
        title: "Bạn bè",
        onClick: (id) => unfriendAction(id),
        icon: <UserCheck className="size-4" />,
    }],
]);

export const NEXT_STATUS_MAP: Map<FriendshipStatusResponseType, FriendshipStatusResponseType> = new Map([
    [FRIENDSHIP_STATUS.NONE, FRIENDSHIP_STATUS.SENT_REQUEST],
    [FRIENDSHIP_STATUS.SENT_REQUEST, FRIENDSHIP_STATUS.NONE],
    [FRIENDSHIP_STATUS.FRIENDED, FRIENDSHIP_STATUS.NONE],
]);

export const NEXT_STATUS_BY_RESPOND_MAP: Map<FriendRequestRespondType, FriendshipStatusResponseType> = new Map([
    [FRIEND_REQUEST_RESPOND_TYPE.ACCEPT, FRIENDSHIP_STATUS.FRIENDED],
    [FRIEND_REQUEST_RESPOND_TYPE.REJECT, FRIENDSHIP_STATUS.NONE],
]);