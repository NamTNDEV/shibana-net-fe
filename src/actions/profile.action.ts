'use server'

import { HttpError } from "@/lib/http-errors";
import { getErrorMessage } from "@/lib/utils";
import { mediaService } from "@/services/media.service";
import { profileService } from "@/services/profile.service";
import { UpdateCoverImageRequestBodyType, UploadCoverImageRequestBodyType, UploadCoverImageResponseDataType } from "@/types/media.type";
import { ActionResponseDataType } from "@/types/response.type";

export const uploadCoverImageAction = async (body: UploadCoverImageRequestBodyType): Promise<ActionResponseDataType<UploadCoverImageResponseDataType>> => {
    try {
        const response = await mediaService.uploadCoverImage(body);
        return {
            success: true,
            message: "Ảnh bìa đã được upload thành công",
            data: response,
        }
    } catch (error) {
        if (error instanceof HttpError) {
            return {
                success: false,
                message: getErrorMessage(error.payload.code),
                code: error.payload.code
            };
        }
        return {
            success: false,
            message: "Lỗi hệ thống, vui lòng thử lại sau.",
        };
    }
}

export const updateCoverImageAction = async (body: UpdateCoverImageRequestBodyType): Promise<ActionResponseDataType<void>> => {
    try {
        const response = await profileService.updateCoverImage(body);
        return {
            success: true,
            message: "Ảnh bìa đã được cập nhật thành công",
        };
    } catch (error) {
        console.error("updateCoverImageAction::", error);
        if (error instanceof HttpError) {
            return {
                success: false,
                message: getErrorMessage(error.payload.code),
                code: error.payload.code
            };
        }
        return { success: false, message: "Lỗi hệ thống, vui lòng thử lại sau." };
    }
}