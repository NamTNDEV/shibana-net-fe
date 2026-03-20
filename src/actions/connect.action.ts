'use server'

import { HttpError } from "@/lib/http-errors";
import { getErrorMessage } from "@/lib/utils";
import { connectionService } from "@/services/connection.service";
import { ActionResponseDataType } from "@/types/response.type"
import { revalidatePath } from "next/cache";

export const followAction = async (followeeUserId: string): Promise<ActionResponseDataType<void>> => {
    try {
        await connectionService.follow(followeeUserId);
        revalidatePath("/profile/[handle]", "page");
        return {
            success: true,
            message: "Đã theo dõi người dùng thành công",
        };
    } catch (error) {
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

export const unfollowAction = async (followeeUserId: string): Promise<ActionResponseDataType<void>> => {
    try {
        await connectionService.unfollow(followeeUserId);
        revalidatePath("/profile/[handle]", "page");
        return {
            success: true,
            message: "Đã bỏ theo dõi người dùng thành công",
        };
    } catch (error) {
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