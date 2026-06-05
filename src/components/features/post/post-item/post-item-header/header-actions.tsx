'use client';

import { HeaderActionItemProps, HeaderActionsButtonProps, PostItemActionType } from "./header-actions.type";
import { useAuthStore } from "@/stores/auth.store";
import { Fragment, useState } from "react";
import { actionGroupsItems, onGoingDevelopmentActions, publicActions } from "./header-actions.constants";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { usePostModalStore } from "@/stores/post-edit-modal.store";

export const HeaderActionsButton = ({ post }: HeaderActionsButtonProps) => {
    const { authUser } = useAuthStore();
    const { openEditModal } = usePostModalStore();

    const [selectedAction, setSelectedAction] = useState<PostItemActionType | null>(null);

    const handleActionItemClick = (actionType: PostItemActionType) => {
        setSelectedAction(actionType);
        openEditModal(post.id);
    }

    const renderedActions = authUser?.userId === post.author.id
        ? actionGroupsItems
        : actionGroupsItems.map(group => ({
            ...group,
            items: group.items.filter(item => publicActions.includes(item.actionType))
        })).filter(group => group.items.length > 0);
    return (
        <>
            <DropdownMenu modal={true}>
                <DropdownMenuTrigger asChild>
                    <div className="size-9 rounded-full hover:bg-gray-200 cursor-pointer flex items-center justify-center">
                        <Ellipsis className="cursor-pointer size-5" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="p-2 min-w-82 shadow-xl shadow-gray-500">
                    {
                        renderedActions.map(group => (
                            <Fragment key={group.id}>
                                <DropdownMenuGroup>
                                    {group.items.map((item, index) => <HeaderActionItem key={index} {...item} onActionTypeChange={handleActionItemClick} />)}
                                </DropdownMenuGroup>
                                {group.id !== renderedActions.length && <DropdownMenuSeparator className="my-2" />}
                            </Fragment>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

const HeaderActionItem = ({ icon: Icon, title, description, actionType, onActionTypeChange }: HeaderActionItemProps) => {
    return (
        <DropdownMenuItem
            className="flex items-center gap-3 p-2 cursor-pointer"
            onClick={() => onActionTypeChange?.(actionType)}
            disabled={onGoingDevelopmentActions.includes(actionType)}
        >
            <Icon className="size-5" />
            <div>
                <h3 className="text-base font-medium">{title}</h3>
                {description && <p className="text-xs text-gray-500">{description}</p>}
            </div>
        </DropdownMenuItem >
    )
}

