'use client'

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { DEFAULT_AVATAR_POSITION_X, DEFAULT_AVATAR_POSITION_Y, DEFAULT_CONTAINER_SIZE } from "./profile-avatar-modal-constants";
import { useAvatarDragAndScale } from "@/hooks/use-avatar-drag-and-scale";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { calculateAvatarMetadataInPercentage } from "./profile-avatar-modal-utils";

type AvatarPreviewProps = {
    avatarUrl: string;
    avatarScale: number;
    initialAvatarPositionX?: number;
    initialAvatarPositionY?: number;
}

export type AvatarPreviewRef = {
    getAvatarMetadata: () => {
        positionXInPercentage: number;
        positionYInPercentage: number;
        avatarScale: number;
    }
}

export const AvatarPreview = forwardRef<AvatarPreviewRef, AvatarPreviewProps>(({
    avatarUrl,
    avatarScale,
    initialAvatarPositionX = DEFAULT_AVATAR_POSITION_X,
    initialAvatarPositionY = DEFAULT_AVATAR_POSITION_Y,
}, ref) => {
    const [imageNaturalSize, setImageNaturalSize] = useState({ width: 0, height: 0 });
    const [renderedSize, setRenderedSize] = useState({ width: 0, height: 0 });

    const { isDragging, onMouseDown, avatarPositionX, avatarPositionY } = useAvatarDragAndScale({
        containerSize: DEFAULT_CONTAINER_SIZE,
        initialImagePositionX: initialAvatarPositionX,
        initialImagePositionY: initialAvatarPositionY,
        renderedAvatarWidth: renderedSize.width,
        renderedAvatarHeight: renderedSize.height,
        currentAvatarScale: avatarScale,
    });

    useEffect(() => {
        if (!imageNaturalSize.width || !imageNaturalSize.height) return;
        const scaleX = DEFAULT_CONTAINER_SIZE / imageNaturalSize.width;
        const scaleY = DEFAULT_CONTAINER_SIZE / imageNaturalSize.height;
        const isWThanH = imageNaturalSize.width > imageNaturalSize.height;
        if (isWThanH) {
            setRenderedSize({
                height: DEFAULT_CONTAINER_SIZE,
                width: imageNaturalSize.width * scaleY
            })
        } else {
            setRenderedSize({
                width: DEFAULT_CONTAINER_SIZE,
                height: imageNaturalSize.height * scaleX
            })
        }
    }, [imageNaturalSize])

    useImperativeHandle(ref, () => ({
        getAvatarMetadata: () => ({
            avatarScale: avatarScale,
            ...calculateAvatarMetadataInPercentage(
                avatarPositionX,
                avatarPositionY,
                renderedSize.width,
                renderedSize.height
            )
        })
    }));

    return (
        <div className="relative w-full h-[420px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <Image
                    src={avatarUrl}
                    alt="Avatar Preview"
                    className={cn(
                        "max-w-none",
                        isDragging && "cursor-move"
                    )}
                    style={{
                        transform: `
                        translate(${avatarPositionX}px, ${avatarPositionY}px)
                        scale(${avatarScale})
                        `,
                        width: renderedSize.width,
                        height: renderedSize.height
                    }}
                    width={0}
                    height={0}
                    onMouseDown={onMouseDown}
                    onLoad={(e) => {
                        const image = e.currentTarget;
                        const naturalWidth = image.naturalWidth;
                        const naturalHeight = image.naturalHeight;

                        setImageNaturalSize({
                            width: naturalWidth,
                            height: naturalHeight
                        });
                    }}
                    priority
                    unoptimized={true}
                />
            </div>
            <div className="absolute pointer-events-none w-full h-full flex items-center justify-center">
                <div className="w-[300px] h-[300px] rounded-full shadow-[0_0_0_9999px_rgba(255,255,255,0.6)]" />
            </div>
        </div>
    )
})