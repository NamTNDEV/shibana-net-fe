import * as z from "zod"

export const LoginSchema = z.object({
    email: z.email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
    password: z.string().min(6, { message: "Vui lòng nhập mật khẩu có ít nhất 6 ký tự" }),
})

export const RegisterSchema = z.object({
    email: z.email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
    firstName: z.string().min(1, "Vui lòng nhập tên"),
    lastName: z.string().min(1, "Vui lòng nhập họ"),
    birthDate: z.string().optional(),
    password: z.string().min(6, "Vui lòng nhập mật khẩu có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không trùng khớp",
    path: ["confirmPassword"],
})