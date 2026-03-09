'use client'

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

const AVATAR_CONTAINER_SIZE = 176;

type ProfileAvatarContainerProps = {
    containerSize?: number;
    avatar: string | null;
    initialName: string;
    avatarScale: number;
    avatarPositionX: number;
    avatarPositionY: number;
}

type RenderedAvatarSize = {
    width: number;
    height: number;
}

export default function ProfileAvatarContainer({ containerSize = AVATAR_CONTAINER_SIZE, avatar: initialAvatar, initialName, avatarScale, avatarPositionX, avatarPositionY }: ProfileAvatarContainerProps) {
    const [renderedAvatarSize, setRenderedAvatarSize] = useState<RenderedAvatarSize>({
        width: 0,
        height: 0,
    });

    return (
        <div className="rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100 cursor-pointer hover:opacity-95 select-none"
            style={{ width: containerSize, height: containerSize }}>
            {
                initialAvatar ? (
                    <Image
                        src={initialAvatar}
                        alt="Profile Avatar"
                        className={cn(
                            "max-w-none transition-opacity duration-300",
                            renderedAvatarSize.width === 0 ? "opacity-0" : "opacity-100"
                        )}
                        style={{
                            transform: `
                                translate(${avatarPositionX}%, ${avatarPositionY}%) 
                                scale(${avatarScale})
                                            `,
                            width: renderedAvatarSize.width || 'auto',
                            height: renderedAvatarSize.height || 'auto'
                        }}
                        width={0}
                        height={0}
                        unoptimized={true}
                        onLoad={(e) => {
                            const image = e.currentTarget;
                            const naturalWidth = image.naturalWidth;
                            const naturalHeight = image.naturalHeight;

                            const scaleX = containerSize / naturalWidth;
                            const scaleY = containerSize / naturalHeight;
                            const isWThanH = naturalWidth > naturalHeight;
                            if (isWThanH) {
                                setRenderedAvatarSize({
                                    width: naturalWidth * scaleY,
                                    height: containerSize,
                                });
                            } else {
                                setRenderedAvatarSize({
                                    width: containerSize,
                                    height: naturalHeight * scaleX,
                                });
                            }
                        }}
                    />
                ) : (
                    <span className="text-5xl font-bold text-gray-400">
                        {initialName}
                    </span>
                )
            }
        </div>
    )
}
