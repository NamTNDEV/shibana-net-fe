'use server'

import { HttpError } from "@/lib/http-errors";
import { getErrorMessage } from "@/lib/utils";
import { connectionService } from "@/services/connection.service";
import { ActionResponseDataType } from "@/types/response.type"
import { revalidatePath } from "next/cache";

// --- FOLLOW ACTIONS ---
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

// --- FRIENDSHIP ACTIONS ---
export const sendFriendRequestAction = async (recieverId: string): Promise<ActionResponseDataType<void>> => {
    try {
        await connectionService.sendFriendRequest(recieverId);
        revalidatePath("/profile/[handle]", "page");
        return {
            success: true,
            message: "Đã gửi lời mời bạn bè thành công",
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

export const acceptFriendRequestAction = async (recieverId: string): Promise<ActionResponseDataType<void>> => {
    try {
        await connectionService.acceptFriendRequest(recieverId);
        revalidatePath("/profile/[handle]", "page");
        return {
            success: true,
            message: "Đã chấp nhận lời mời bạn bè thành công",
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
export const rejectFriendRequestAction = async (recieverId: string): Promise<ActionResponseDataType<void>> => {
    try {
        await connectionService.rejectFriendRequest(recieverId);
        revalidatePath("/profile/[handle]", "page");
        return {
            success: true,
            message: "Đã từ chối lời mời bạn bè thành công",
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

export const unfriendAction = async (recieverId: string): Promise<ActionResponseDataType<void>> => {
    try {
        await connectionService.unfriend(recieverId);
        revalidatePath("/profile/[handle]", "page");
        return {
            success: true,
            message: "Đã xóa bạn bè thành công",
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

export const revokeFriendRequestAction = async (revokeeId: string): Promise<ActionResponseDataType<void>> => {
    try {
        await connectionService.revokeFriendRequest(revokeeId);
        revalidatePath("/profile/[handle]", "page");
        return {
            success: true,
            message: "Đã hủy lời mời bạn bè thành công",
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