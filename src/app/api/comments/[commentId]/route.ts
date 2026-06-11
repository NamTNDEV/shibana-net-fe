import { HttpError } from "@/lib/http-errors";
import { commentService } from "@/services/comment.service";
import { NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{ commentId: string }>;
};

export async function PUT(request: Request, { params }: RouteParams) {
    const { commentId } = await params;
    const body = await request.json();
    try {
        const response = await commentService.editComment(commentId, body);

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
