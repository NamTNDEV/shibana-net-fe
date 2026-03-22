import { FriendshipStatusResponseType } from "@/constants/connection";
import { useOptimistic, useTransition } from "react";
import { BUTTON_CONTEXT_MAP, FriendRequestRespondType, NEXT_STATUS_MAP, NEXT_STATUS_BY_RESPOND_MAP } from "./config";
import { toast } from "sonner";

type UseFriendButtonActionsPropsType = {
    recieverId: string;
    friendshipStatus: FriendshipStatusResponseType;
}

export const useFriendButtonActions = ({ recieverId, friendshipStatus }: UseFriendButtonActionsPropsType) => {
    const [isPending, startTransition] = useTransition();
    const [optimisticFriendshipStatus, toggleOptimisticFriendshipStatus] = useOptimistic(
        friendshipStatus,
        (_, newFriendshipStatus: FriendshipStatusResponseType) => newFriendshipStatus
    );

    const currentFriendshipStatusContext = BUTTON_CONTEXT_MAP.get(optimisticFriendshipStatus);

    const handleClick = (respondType?: FriendRequestRespondType) => {
        if (isPending || !currentFriendshipStatusContext) return;
        startTransition(async () => {

            const nextFriendshipStatus = !respondType
                ? NEXT_STATUS_MAP.get(optimisticFriendshipStatus)
                : NEXT_STATUS_BY_RESPOND_MAP.get(respondType);

            if (!nextFriendshipStatus) return;

            toggleOptimisticFriendshipStatus(nextFriendshipStatus);

            const response = await currentFriendshipStatusContext.onClick(recieverId, respondType);
            if (response.success) {
                toast.success(response.message, {
                    position: "bottom-right",
                    richColors: true,
                    duration: 1000,
                });
            } else {
                toast.error(response.message, {
                    position: "bottom-right",
                    richColors: true,
                    duration: 1000,
                });
            }
        });
    }

    return {
        isPending,
        currentFriendshipStatusContext,
        optimisticFriendshipStatus,
        handleClick
    }
}