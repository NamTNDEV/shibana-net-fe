'use client';

import { PostAuthorResponseDataType } from "@/types/post.type";
import { PrivacyType } from "../../profile/about/profile-about-item.type";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import ProfileAvatarContainer from "../../profile/header/avatar/profile-avatar-container";
import { formatDate, getInitialName } from "@/lib/utils";
import { getPrivacyIconByType } from "../../profile/about/about.utils";
import { Archive, Ellipsis, History, Pencil, Pin, Settings, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Fragment, useState } from "react";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import PostCreationForm from "../post-creation/post-creation-form";
import { useAuthStore } from "@/stores/auth.store";

export type PostHeaderProps = {
    author: PostAuthorResponseDataType;
    createdAt: string;
    privacy: PrivacyType;
    content: string;
}

export default function PostHeader({ author, createdAt, privacy, content }: PostHeaderProps) {
    const router = useRouter();

    const handleProfileAvatarClick = () => {
        router.push(ROUTES.USER.PROFILE.replace(":handle", author.username));
    }

    return (
        <div className="px-3 pt-3 flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon-lg"
                    className="hover:bg-transparent hover:opacity-90"
                    onClick={handleProfileAvatarClick}
                >
                    <ProfileAvatarContainer
                        avatar={author.avatarUrl}
                        initialName={getInitialName(author.lastName, author.firstName)}
                        avatarScale={author.avatarScale || 1}
                        avatarPositionX={author.avatarPositionX || 0}
                        avatarPositionY={author.avatarPositionY || 0}
                        containerSize={40}
                    />
                </Button>

                <div className="flex flex-col">
                    <span className="text-[15px] font-semibold cursor-pointer hover:underline" onClick={handleProfileAvatarClick}>{`${author.lastName} ${author.firstName}`}</span>
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500 hover:cursor-pointer hover:underline">{formatDate(createdAt, "dd/MM/yyyy HH:mm")}</span>
                        <span className="text-[10px] text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{getPrivacyIconByType(privacy, "size-3")}</span>
                    </div>
                </div>
            </div>

            <HeaderActionsButton
                content={content}
                privacy={privacy}
                author={author} />
        </div>
    )
}

type ActionItemGroupType = {
    id: number;
    items: HeaderActionItemProps[];
}

type PostItemActionType = 'PIN' | 'VIEW_HISTORY' | 'EDIT_POST' | 'EDIT_PRIVACY' | 'STORE' | 'DELETE';

type HeaderActionItemProps = {
    icon: React.ElementType;
    title: string;
    actionType: PostItemActionType;
    description?: string;
    onActionTypeChange?: (actionType: PostItemActionType) => void;
}

type HeaderActionsButtonProps = {
    content: string;
    privacy: PrivacyType;
    author: PostAuthorResponseDataType;
}

const actionGroupsItems: ActionItemGroupType[] = [
    {
        id: 1,
        items: [
            {
                icon: Pin,
                title: "Lưu bài viết",
                actionType: "PIN",
                description: "Thêm vào danh sách thư mục đã lưu."
            },
        ]
    },
    {
        id: 2,
        items: [
            {
                icon: History,
                actionType: "VIEW_HISTORY",
                title: "Xem lịch sử chỉnh sửa",
            },
            {
                icon: Pencil,
                actionType: "EDIT_POST",
                title: "Chỉnh sửa bài viết",
            },
            {
                icon: Settings,
                actionType: "EDIT_PRIVACY",
                title: "Chỉnh sửa đối tượng chia sẻ",
            },
        ]
    },
    {
        id: 3,
        items: [
            {
                icon: Archive,
                actionType: "STORE",
                title: "Chuyển vào kho lưu trữ",
            },
            {
                icon: Trash2,
                title: "Chuyển vào thùng rác",
                actionType: "DELETE",
                description: "Các mục trong thùng rác sẽ bị xóa vĩnh viễn sau 30 ngày.",
            }
        ]
    },
]

const publicActions = ["PIN", "VIEW_HISTORY"];
const onGoingDevelopmentActions = ["PIN", "VIEW_HISTORY", "EDIT_PRIVACY", "STORE", "DELETE"];


const HeaderActionsButton = ({ content, privacy, author }: HeaderActionsButtonProps) => {
    const { authUser } = useAuthStore();

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAction, setSelectedAction] = useState<PostItemActionType | null>(null);

    const handleActionItemClick = (actionType: PostItemActionType) => {
        setSelectedAction(actionType);
        setOpenDialog(true);
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
        setSelectedAction(null);
    }

    const renderedActions = authUser?.userId === author.id
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

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="p-0 gap-0 bg-white max-w-125 overflow-hidden" showCloseButton={false}>
                    {selectedAction === "EDIT_POST" && (
                        <PostCreationForm
                            mode="EDIT"
                            onModalClose={handleDialogClose}
                            initialData={content}
                            initialPrivacy={privacy}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}



const HeaderActionItem = ({ icon: Icon, title, description, actionType, onActionTypeChange }: HeaderActionItemProps) => {
    return (
        <DropdownMenuItem className="flex items-center gap-3 p-2 cursor-pointer" onClick={() => onActionTypeChange?.(actionType)} disabled={onGoingDevelopmentActions.includes(actionType)}>
            <Icon className="size-5" />
            <div>
                <h3 className="text-base font-medium">{title}</h3>
                {description && <p className="text-xs text-gray-500">{description}</p>}
            </div>
        </DropdownMenuItem >
    )
}
