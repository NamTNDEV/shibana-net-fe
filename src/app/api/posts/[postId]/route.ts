import { postService } from "@/services/post.service";
import { NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{ postId: string }>;
};

export async function PUT(request: Request, { params }: RouteParams) {
    const { postId } = await params;
    try {
        const body = await request.json();
        const res = await postService.editPost(postId, body);
        return NextResponse.json(res);
    } catch (error) {
        console.error("❌ Failed to edit post:", error);
        return NextResponse.json({ success: false, message: "Lỗi hệ thống, vui lòng thử lại sau." }, { status: 500 });
    }
}   