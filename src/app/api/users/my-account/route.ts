import { HttpError } from "@/lib/http-errors";
import { userService } from "@/services/user.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const data = await userService.safeGetMyAccountMetadata();
        return NextResponse.json({ code: 200, message: "🟢 Lấy thông tin tài khoản thành công", data });
    } catch (error) {
        if (error instanceof HttpError) {
            return NextResponse.json(error.payload, { status: error.status });
        }
        return NextResponse.json({ code: 500, message: "🚨 Lỗi hệ thống, vui lòng thử lại sau." }, { status: 500 });
    }
}