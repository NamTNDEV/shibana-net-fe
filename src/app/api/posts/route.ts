import { postService } from "@/services/post.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const res = await postService.createPost(body);
        return NextResponse.json(res);
    } catch (error) {
        console.error("❌ Failed to create post:", error);
        return NextResponse.json({ success: false, message: "Lỗi hệ thống, vui lòng thử lại sau." }, { status: 500 });
    }
} 