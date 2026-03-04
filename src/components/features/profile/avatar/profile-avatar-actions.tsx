'use client'
import { Camera } from "lucide-react";

type ProfileAvatarActionsProps = {
    onUploadClick: () => void;
}

export default function ProfileAvatarActions({ onUploadClick }: ProfileAvatarActionsProps) {
    return (
        <div
            className="absolute bottom-4 right-4 size-9
             bg-secondary rounded-full flex items-center justify-center
                    shadow hover:cursor-pointer hover:bg-[#dbdee1]"
            onClick={() => onUploadClick()}
        >
            <Camera className="size-5" />
        </div>
    )
}
