'use client'

import { followAction, unfollowAction } from "@/actions/connect.action";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { CircleCheckBig, CirclePlus, Loader2 } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

export type FollowButtonPropsType = {
    isFollowing: boolean;
    followeeUserId: string;
}
export default function FollowButton({ isFollowing, followeeUserId }: FollowButtonPropsType) {
    const [isPending, startTransition] = useTransition();
    const [optimisticIsFollowing, toggleOptimisticIsFollowing] = useOptimistic(
        isFollowing,
        (currentState, _newFollowStatus) => !currentState
    )

    const handleFollow = () => {
        if (isPending) return;
        startTransition(async () => {
            toggleOptimisticIsFollowing(null);
            const response = optimisticIsFollowing ? await unfollowAction(followeeUserId) : await followAction(followeeUserId);

            if (!response.success) {
                toast.error(response.message, {
                    position: "bottom-right",
                    richColors: true,
                    duration: 1000,
                });
                return;
            }

            toast.success(response.message, {
                position: "bottom-right",
                richColors: true,
                duration: 1000,
            });
        })
    }

    return (
        <>
            <Button
                onClick={handleFollow}
                variant="outline"
                className="flex items-center justify-center gap-1 px-3 h-9 hover:opacity-80"
            >
                {isPending ? <Loader2 className="size-4 animate-spin" /> : optimisticIsFollowing ? <CircleCheckBig className="size-4" /> : <CirclePlus className="size-4" />}
                {optimisticIsFollowing ? "Bỏ theo dõi" : "Theo dõi"}
            </Button >
        </>
    )
}
