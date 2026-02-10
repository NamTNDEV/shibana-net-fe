import { HttpError } from "@/lib/http-errors";
import { userService } from "@/services/user.service";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await userService.getMe();
        return NextResponse.json({ data: data ?? null }, { status: 200 });
    } catch (error) {
        if (error instanceof HttpError) {
            return NextResponse.json({ code: error.payload.code, message: error.payload.message }, { status: error.status });
        }
        return NextResponse.json({ code: 500, message: "Internal server error" }, { status: 500 });
    }
}