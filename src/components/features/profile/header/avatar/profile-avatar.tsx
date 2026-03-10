'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth.store";
import ProfileAvatarActions from "./profile-avatar-actions";
import { useEffect, useRef, useState } from "react";
import { Images, SquareUser } from "lucide-react";
import ProfileAvatarModal from "./profile-avatar-modal";
import { useRouter } from "next/navigation";
import ProfileAvatarContainer from "./profile-avatar-container";

export type ProfileAvatarPropsType = {
    avatar: string | null;
    initialName: string;
    userId: string;
    avatarScale?: number;
    avatarPositionX?: number;
    avatarPositionY?: number;
}

export default function ProfileAvatar({
    avatar: initialAvatar,
    initialName,
    userId,
    avatarScale = 1,
    avatarPositionX = 0,
    avatarPositionY = 0,
}: ProfileAvatarPropsType) {
    const router = useRouter();
    const { authUser } = useAuthStore();
    const avatarUploadedInputRef = useRef<HTMLInputElement | null>(null);

    const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null);
    const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

    useEffect(() => {
        return () => {
            if (previewAvatarUrl) {
                URL.revokeObjectURL(previewAvatarUrl);
            }
        }
    }, [previewAvatarUrl])

    const handleUploadClick = () => {
        avatarUploadedInputRef.current?.click();
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedAvatar = e.target.files?.[0];
        if (!uploadedAvatar) return;

        if (previewAvatarUrl) {
            URL.revokeObjectURL(previewAvatarUrl);
        }

        setSelectedAvatar(uploadedAvatar);
        const objUrl = URL.createObjectURL(uploadedAvatar);
        setPreviewAvatarUrl(objUrl);

        if (avatarUploadedInputRef.current) {
            avatarUploadedInputRef.current.value = "";
        }
    }

    const handleCloseModal = () => {
        setPreviewAvatarUrl(null);
    }

    const handleAvatarUpdateSuccess = () => {
        setPreviewAvatarUrl(null);
        setSelectedAvatar(null);
        router.refresh();
    }

    return (
        <div className="relative">
            <div className="bg-white rounded-full p-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <ProfileAvatarContainer
                            avatar={initialAvatar}
                            initialName={initialName}
                            avatarScale={avatarScale}
                            avatarPositionX={avatarPositionX}
                            avatarPositionY={avatarPositionY}
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-fit rounded-xl mt-3 shadow-lg/50 p-2" align="center">
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="gap-3 p-2 hover:cursor-pointer">
                                <SquareUser className="size-5" />
                                <span className="text-base sm:w-[280px]">Xem ảnh đại diện</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 p-2 hover:cursor-pointer" onClick={handleUploadClick}>
                                <Images className="size-5" />
                                <span className="text-base sm:w-[280px]">Chọn ảnh đại diện</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
            {userId === authUser?.userId && (
                <ProfileAvatarActions
                    onUploadClick={handleUploadClick}
                />
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                ref={avatarUploadedInputRef}
            />

            <ProfileAvatarModal
                avatarUrl={previewAvatarUrl}
                selectedAvatar={selectedAvatar}
                onClose={handleCloseModal}
                onUpdateSuccess={handleAvatarUpdateSuccess}
            />
        </div>

    )
}
