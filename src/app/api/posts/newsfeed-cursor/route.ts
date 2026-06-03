import { HttpError } from "@/lib/http-errors";
import { postService } from "@/services/post.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");
    const size = Number(searchParams.get("size"));
    try {
        const response = await postService.getNewsfeedCursorBasedV02(size, cursor);

        return NextResponse.json(
            {
                code: response.code,
                message: response.message,
                data: response.data,
            }
        )
    } catch (error) {
        if (error instanceof HttpError) {
            return NextResponse.json(error.payload, { status: error.status });
        }
        return NextResponse.json({ code: 500, message: "Lỗi hệ thống, vui lòng thử lại sau." }, { status: 500 });
    }
}