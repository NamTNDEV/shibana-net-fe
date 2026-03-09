import { MediaStorageType } from "@/constants/media-type"
// Request
export type UploadMediaRequestBodyType = {
    file: File
}

// Response
export type UploadCoverImageResponseDataType = {
    mediaId: string
    fileName: string
    url: string
    storageType: MediaStorageType
}

