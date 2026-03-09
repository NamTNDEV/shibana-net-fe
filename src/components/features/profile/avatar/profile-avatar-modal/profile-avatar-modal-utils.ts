export type GetAvatarMetadataInPercentage = {
    positionXInPercentage: number;
    positionYInPercentage: number;
}

export const calculateAvatarMetadataInPercentage = (
    positionXInPixel: number,
    positionYInPixel: number,
    displayedWidthInPixel: number,
    displayedHeightInPixel: number
): GetAvatarMetadataInPercentage => {
    return {
        positionXInPercentage: (positionXInPixel / displayedWidthInPixel) * 100,
        positionYInPercentage: (positionYInPixel / displayedHeightInPixel) * 100,
    }
}