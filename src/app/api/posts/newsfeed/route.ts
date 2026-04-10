import { HttpError } from "@/lib/http-errors";
import { postService } from "@/services/post.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page"));
    const size = Number(searchParams.get("size"));

    try {
        const data = await postService.getNewsfeed(page, size);
        return NextResponse.json({ code: 200, message: "Lấy danh sách bài viết thành công", data });
    } catch (error) {
        if (error instanceof HttpError) {
            return NextResponse.json(error.payload, { status: error.status });
        }
        return NextResponse.json({ code: 500, message: "Lỗi hệ thống, vui lòng thử lại sau." }, { status: 500 });
    }
}