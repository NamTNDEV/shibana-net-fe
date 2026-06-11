import { HttpError } from "@/lib/http-errors";
import { commentService } from "@/services/comment.service";
import { NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{ commentId: string }>;
};

export async function GET(request: Request, { params }: RouteParams) {
    const { commentId } = await params;
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");
    const size = Number(searchParams.get("size"));

    try {
        const response = await commentService.getRepliesCommentList(commentId, size, cursor);

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

// export async function POST(request: Request, { params }: RouteParams) {
//     const { commentId } = await params;
//     const body = await request.json();

//     try {
//         const response = await commentService.createRootComment(body, commentId);

//         return NextResponse.json(
//             {
//                 code: response.code,
//                 message: response.message,
//                 data: response.data,
//             }
//         )
//     } catch (error) {
//         if (error instanceof HttpError) {
//             return NextResponse.json(error.payload, { status: error.status });
//         }
//         return NextResponse.json({ code: 500, message: "Lỗi hệ thống, vui lòng thử lại sau." }, { status: 500 });
//     }
// }