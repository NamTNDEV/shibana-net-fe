import { RegisterForm } from "@/components/features/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng ký",
    description: "Đăng ký tài khoản ShibaNa Net để tiếp tục",
}

export default function RegisterPage() {
    return (
        <div className="w-full">
            <RegisterForm />
        </div>
    )
}
