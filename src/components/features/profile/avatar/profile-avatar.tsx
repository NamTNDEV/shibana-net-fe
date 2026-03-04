'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth.store";
import ProfileAvatarActions from "./profile-avatar-actions";
import { useEffect, useRef, useState } from "react";
import { Images, SquareUser } from "lucide-react";
import ProfileAvatarModal from "./profile-avatar-modal";

export type ProfileAvatarPropsType = {
    avatar: string | null;
    initialName: string;
    userId: string;
    avatarScale?: number;
    avatarPositionX?: number;
    avatarPositionY?: number;
}

// const DEFAULT_AVATAR_URL = "http://localhost:8888/api/v1/media/static/8537ab0f-c26d-4a2b-b239-fad2e47cae8d.jpg";

export default function ProfileAvatar({ avatar: initialAvatar, initialName, userId, avatarScale = 1, avatarPositionX = 0, avatarPositionY = 0 }: ProfileAvatarPropsType) {
    const { authUser } = useAuthStore();
    const avatarUploadedInputRef = useRef<HTMLInputElement | null>(null);

    const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null);
    const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
    const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(initialAvatar);

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

    return (
        <div className="relative">
            <div className="bg-white rounded-full p-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="w-44 h-44 border border-black rounded-full hover:cursor-pointer hover:opacity-95">
                            <AvatarImage
                                src={currentAvatarUrl || undefined}
                                className="object-cover"
                                style={{
                                    transform: `
                                        scale(${avatarScale})
                                        translate(${avatarPositionX}%, ${avatarPositionY}%)  
                                    `
                                }}
                            />
                            <AvatarFallback>{initialName}</AvatarFallback>
                        </Avatar>
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
                onClose={handleCloseModal}
            />
        </div>

    )
}
