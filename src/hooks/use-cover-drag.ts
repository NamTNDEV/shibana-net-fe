import { useEffect, useRef, useState } from "react";

type UseCoverDragProps = {
    containerReference: React.RefObject<HTMLDivElement | null>;
    imageNaturalHeight: number;
    imageNaturalWidth: number;
    initialImagePosition?: number;
}

export const useCoverDrag = ({
    containerReference,
    imageNaturalHeight,
    imageNaturalWidth,
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
            if (!containerReference.current || !imageNaturalHeight || !imageNaturalWidth) return;

            const containerWidth = containerReference.current.clientWidth;
            const containerHeight = containerReference.current.clientHeight;

            const scaleX = containerWidth / imageNaturalWidth;
            const scaleY = containerHeight / imageNaturalHeight;
            const scale = Math.max(scaleX, scaleY);

            const renderedImageHeight = imageNaturalHeight * scale;

            const maxDragDistanceInPixel = renderedImageHeight - containerHeight;
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
    }, [isDragging, containerReference, imageNaturalHeight, imageNaturalWidth])

    return {
        imagePositionY,
        onMouseDown,
        isDragging,
        setImagePositionY,
    };
}