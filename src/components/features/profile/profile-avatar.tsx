'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/stores/auth.store";
import { Camera } from "lucide-react";

export type ProfileAvatarPropsType = {
    avatar: string | null;
    initialName: string;
    userId: string;
}

export default function ProfileAvatar({ avatar, initialName, userId }: ProfileAvatarPropsType) {
    const { authUser } = useAuthStore();

    return (
        <div className="relative">
            <div className="bg-white rounded-full p-1">
                <Avatar className="w-44 h-44 border border-black rounded-full hover:cursor-pointer hover:opacity-95">
                    <AvatarImage src={avatar ?? undefined} />
                    <AvatarFallback>{initialName}</AvatarFallback>
                </Avatar>
            </div>
            {userId === authUser?.userId && (
                <div className="absolute bottom-4 right-4 size-9
             bg-secondary rounded-full flex items-center justify-center
                    shadow hover:cursor-pointer hover:bg-[#dbdee1]">
                    <Camera className="size-5" />
                </div>
            )}
        </div>

    )
}
