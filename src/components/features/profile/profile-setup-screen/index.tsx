"use client";

import { Loader2 } from "lucide-react";

export default function ProfileSetupScreen() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Xin chào Bạn!
            </h2>

            <p className="text-gray-500 max-w-md text-base">
                Chúng tôi đang hoàn tất việc thiết lập không gian cá nhân cho bạn.
                <br />
                Quá trình này có thể mất một chút thời gian, xin vui lòng chờ trong giây lát.
            </p>

            <div className="mt-10 w-full max-w-2xl opacity-50 pointer-events-none">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="w-48 h-6 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="w-64 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
            </div>
        </div>
    );
}