import { useEffect, useRef, useState } from "react";

type UseCoverDragProps = {
    containerHeight: number;
    imageHeight: number;
    initialImagePosition?: number;
}

export const useCoverDrag = ({
    containerHeight,
    imageHeight,
    initialImagePosition = 50
}: UseCoverDragProps) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [imagePositionY, setImagePositionY] = useState<number>(initialImagePosition);

    const startingMousePositionY = useRef<number>(0);
    const startingImagePositionY = useRef<number>(initialImagePosition);

    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        startingMousePositionY.current = e.clientY;
        startingImagePositionY.current = imagePositionY;
    }

    useEffect(() => {
        if (!isDragging) return;

        const onMouseUp = () => {
            setIsDragging(false);
        }

        const onMouseMove = (e: MouseEvent) => {
            const maxDragDistanceInPixel = imageHeight - containerHeight;
            if (maxDragDistanceInPixel <= 0) return;
            const deltaMousePositionInPixel = e.clientY - startingMousePositionY.current;
            const deltaMousePositionInPercentage = (deltaMousePositionInPixel / maxDragDistanceInPixel) * 100;
            let newImagePositionInPercentage = startingImagePositionY.current - deltaMousePositionInPercentage;
            newImagePositionInPercentage = Math.max(Math.min(newImagePositionInPercentage, 100), 0);
            setImagePositionY(newImagePositionInPercentage);
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }
    }, [isDragging, imageHeight, containerHeight])

    return {
        imagePositionY,
        onMouseDown,
        isDragging,
        setImagePositionY,
    };
}