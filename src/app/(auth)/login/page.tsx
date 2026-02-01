import { LoginForm } from "@/components/features/auth/login-form";
import { Spinner } from "@/components/ui/spinner";
import { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Đăng nhập",
    description: "Đăng nhập vào ShibaNa Net để tiếp tục",
}

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ redirect?: string }>
}) {
    const LoadingComponent = () => {
        return (
            <div className="w-full">
                <div className="flex items-center justify-center h-[500px]">
                    <Spinner className="size-8 opacity-80" />
                </div>
            </div>
        )
    }
    await connection()
    return (
        <Suspense fallback={<LoadingComponent />}>
            <div className="w-full">
                <LoginForm searchParams={searchParams} />
            </div>
        </Suspense>
    )
}
