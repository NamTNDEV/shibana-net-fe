import { postService } from "@/services/post.service";
import { NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{ postId: string }>;
};

export async function GET(request: Request, { params }: RouteParams) {
    const { postId } = await params;
    try {
        const res = await postService.getPostDetailById(postId);
        if (!res) {
            return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
        }
        return NextResponse.json(res);
    } catch (error) {
        console.error("❌ Failed to fetch post detail:", error);
        return NextResponse.json({ success: false, message: "Lỗi hệ thống, vui lòng thử lại sau." }, { status: 500 });
    }
}

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