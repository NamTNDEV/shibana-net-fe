import { useEffect, useRef, useState } from "react";

type UseAvatarDragAndScaleProps = {
    containerSize: number;
    initialImagePositionX: number;
    initialImagePositionY: number;
    renderedAvatarWidth: number;
    renderedAvatarHeight: number;
    currentAvatarScale: number;
}

export const useAvatarDragAndScale = ({
    containerSize,
    initialImagePositionX,
    initialImagePositionY,
    renderedAvatarWidth,
    renderedAvatarHeight,
    currentAvatarScale
}: UseAvatarDragAndScaleProps) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const [avatarPositionX, setAvatarPositionX] = useState<number>(initialImagePositionX);
    const [avatarPositionY, setAvatarPositionY] = useState<number>(initialImagePositionY);

    const startingMousePositionX = useRef<number>(0);
    const startingImagePositionX = useRef<number>(initialImagePositionX);

    const startingMousePositionY = useRef<number>(0);
    const startingImagePositionY = useRef<number>(initialImagePositionY);

    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        startingMousePositionX.current = e.clientX;
        startingMousePositionY.current = e.clientY;
        startingImagePositionX.current = avatarPositionX;
        startingImagePositionY.current = avatarPositionY;
    }

    const getBoundaries = (scale: number) => {
        const currentWidth = renderedAvatarWidth * scale;
        const currentHeight = renderedAvatarHeight * scale;
        const maxDeltaDragWidth = currentWidth - containerSize;
        const maxDeltaDragHeight = currentHeight - containerSize;

        // Calculate the limit of the range where the avatar can be dragged "PER SIDE"
        const limitX = Math.max(0, maxDeltaDragWidth / 2);
        const limitY = Math.max(0, maxDeltaDragHeight / 2);
        return {
            limitX,
            limitY
        }
    }

    const clampPosition = (position: number, limit: number) => {
        return Math.max(-limit, Math.min(limit, position));
    }

    useEffect(() => {
        if (!isDragging) return;

        const onMouseUp = () => {
            setIsDragging(false);
        }

        const onMouseMove = (e: MouseEvent) => {
            // 1. Calculate the boundary of the range where the avatar can be dragged (maxDistanceInPixel)
            const { limitX, limitY } = getBoundaries(currentAvatarScale);

            // 2. Calculate the moved distance of the mouse in pixel
            const deltaMousePositionX = (e.clientX - startingMousePositionX.current);
            const deltaMousePositionY = (e.clientY - startingMousePositionY.current);

            // 3. Calculate the new position of the avatar in pixel
            const newImagePositionX = startingImagePositionX.current + deltaMousePositionX;
            const newImagePositionY = startingImagePositionY.current + deltaMousePositionY;

            // 4. Set the new position of the avatar in pixel
            setAvatarPositionX(clampPosition(newImagePositionX, limitX));
            setAvatarPositionY(clampPosition(newImagePositionY, limitY));
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }
    }, [isDragging, currentAvatarScale, renderedAvatarWidth, renderedAvatarHeight])

    useEffect(() => {
        if (!renderedAvatarWidth || !renderedAvatarHeight) return;
        const { limitX, limitY } = getBoundaries(currentAvatarScale);
        setAvatarPositionX(prev => clampPosition(prev, limitX));
        setAvatarPositionY(prev => clampPosition(prev, limitY));
    }, [currentAvatarScale, renderedAvatarWidth, renderedAvatarHeight])

    return {
        isDragging,
        onMouseDown,
        avatarPositionX,
        avatarPositionY,
    }
}