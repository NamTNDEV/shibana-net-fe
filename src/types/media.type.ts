import { MediaStorageType } from "@/constants/media-type"
// Request
export type UploadCoverImageRequestBodyType = {
    file: File
}

export type UpdateCoverImageRequestBodyType = {
    coverMediaName?: string
    coverPositionY: number
}

// Response
export type UploadCoverImageResponseDataType = {
    mediaId: string
    fileName: string
    url: string
    storageType: MediaStorageType
}

