import { HttpError } from "@/lib/http-errors";
import { privacyService } from "@/services/privacy.service";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await privacyService.getList();
        return NextResponse.json({ code: 200, message: "Lấy danh sách quyền riêng tư thành công", data });
    } catch (error) {
        if (error instanceof HttpError) {
            return NextResponse.json(error.payload, { status: error.status });
        }
        return NextResponse.json(
            { code: 500, message: "Lỗi hệ thống, vui lòng thử lại sau." },
            { status: 500 }
        );
    }
}