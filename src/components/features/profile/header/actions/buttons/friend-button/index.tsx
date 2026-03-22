'use client'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FRIENDSHIP_STATUS, FriendshipStatusResponseType } from "@/constants/connection";
import { FRIEND_REQUEST_RESPOND_TYPE } from "./config";
import { useFriendButtonActions } from "./use-actions";

type FriendButtonPropsType = {
    recieverId: string;
    friendshipStatus: FriendshipStatusResponseType;
}

export default function FriendButton({ friendshipStatus, recieverId }: FriendButtonPropsType) {
    const { isPending, currentFriendshipStatusContext, optimisticFriendshipStatus, handleClick } = useFriendButtonActions({ recieverId, friendshipStatus });
    if (!currentFriendshipStatusContext) return null;
    const { title, icon } = currentFriendshipStatusContext;

    return (
        <>
            {
                optimisticFriendshipStatus === FRIENDSHIP_STATUS.RECEIVED_REQUEST || optimisticFriendshipStatus === FRIENDSHIP_STATUS.FRIENDED ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="flex items-center justify-center gap-1 px-3 h-9 hover:opacity-80"
                                variant={optimisticFriendshipStatus === FRIENDSHIP_STATUS.FRIENDED ? "outline" : "default"}
                            >
                                <span className={cn(
                                    "flex items-center gap-1",
                                    optimisticFriendshipStatus === FRIENDSHIP_STATUS.RECEIVED_REQUEST && "text-white"
                                )}>
                                    {icon}
                                    {title}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        {
                            optimisticFriendshipStatus === FRIENDSHIP_STATUS.RECEIVED_REQUEST ? (
                                <DropdownMenuContent className="mt-2 p-1" align="start">
                                    <DropdownMenuItem
                                        className="min-w-screen md:min-w-[280px] max-h-8 p-2 hover:cursor-pointer hover:bg-secondary!"
                                        onClick={() => handleClick(FRIEND_REQUEST_RESPOND_TYPE.ACCEPT)}
                                        disabled={isPending}
                                    >
                                        Xác nhận
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="min-w-screen md:min-w-[280px] max-h-8 p-2 hover:cursor-pointer hover:bg-secondary!"
                                        onClick={() => handleClick(FRIEND_REQUEST_RESPOND_TYPE.REJECT)}
                                        disabled={isPending}
                                    >
                                        Từ chối
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            ) : (
                                <DropdownMenuContent className="mt-2 p-1" align="start">
                                    <DropdownMenuItem
                                        className="min-w-screen md:min-w-[280px] max-h-8 p-2 hover:cursor-pointer hover:bg-secondary!"
                                        onClick={() => handleClick()}
                                        disabled={isPending}
                                    >
                                        Xoá bạn bè
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            )
                        }
                    </DropdownMenu>
                ) : (
                    <Button
                        className="flex items-center justify-center gap-1 px-3 h-9 hover:opacity-80"
                        variant="outline"
                        onClick={() => handleClick()}
                        disabled={isPending}
                    >
                        <span className="flex items-center gap-1">
                            {icon}
                            {title}
                        </span>
                    </Button >
                )
            }
        </>
    )
}  