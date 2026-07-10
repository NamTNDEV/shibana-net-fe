import { HttpError } from "@/lib/http-errors";
import { reactionService } from "@/services/reaction.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    try {
        const response = await reactionService.toggleReaction(body);

        return NextResponse.json(
            {
                code: response.code,
                message: response.message,
            }
        )
    } catch (error) {
        if (error instanceof HttpError) {
            return NextResponse.json(error.payload, { status: error.status });
        }
        return NextResponse.json({ code: 500, message: "Lỗi hệ thống, vui lòng thử lại sau." }, { status: 500 });
    }
}