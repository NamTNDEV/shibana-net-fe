import { HttpError } from "@/lib/http-errors";
import { commentService } from "@/services/comment.service";
import { NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{ postId: string }>;
};

export async function GET(request: Request, { params }: RouteParams) {
    const { postId } = await params;
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");
    const size = Number(searchParams.get("size"));

    try {
        const response = await commentService.getCommentList(postId, size, cursor);

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