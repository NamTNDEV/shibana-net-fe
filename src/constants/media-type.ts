export const MEDIA_STORAGE_TYPE = {
    LOCAL: "LOCAL",
    S3: "S3",
} as const;

export type MediaStorageType = (typeof MEDIA_STORAGE_TYPE)[keyof typeof MEDIA_STORAGE_TYPE]