import { HttpError } from "@/lib/http-errors";
import { userService } from "@/services/user.service";
import { MyAccountMetadataResponseDataType } from "@/types/user.type";
import { NextResponse } from "next/server";

export type RouteHandlerResponseType<T> = {
    success: boolean;
    message: string;
    code?: number;
    data?: T;
}

export async function GET(): Promise<NextResponse<RouteHandlerResponseType<MyAccountMetadataResponseDataType | null>>> {
    try {
        const data = await userService.getMyAccountMetadata();
        return NextResponse.json<RouteHandlerResponseType<MyAccountMetadataResponseDataType | null>>({ success: true, message: "Success", data: data ?? null }, { status: 200 });
    } catch (error) {
        if (error instanceof HttpError) {
            return NextResponse.json<RouteHandlerResponseType<null>>({ success: false, message: error.payload.message, code: error.payload.code }, { status: error.status });
        }
        return NextResponse.json<RouteHandlerResponseType<null>>({ success: false, message: "Internal server error", code: 500 }, { status: 500 });
    }
}