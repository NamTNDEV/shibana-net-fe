import { LoginForm } from "@/components/features/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng nhập",
    description: "Đăng nhập vào ShibaNa Net để tiếp tục",
}

export default function LoginPage() {
    return (
        <div className="w-full">
            <LoginForm />
        </div>
    )
}
