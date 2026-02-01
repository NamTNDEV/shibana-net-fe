"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"

import { RegisterSchema } from "@/schemas/auth.schema"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import PasswordButton from "./password-button"
import SocialLoginButton from "./social-login-button"

type RegisterFormValues = z.infer<typeof RegisterSchema>

export function RegisterForm() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            birthDate: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = (values: RegisterFormValues) => {
        // TODO: Tích hợp API đăng ký tại đây
        console.log("Register with values", values)
    }

    const isSubmitting = form.formState.isSubmitting

    return (
        <Card className="w-full mx-auto border-none shadow-none bg-transparent p-0">
            <CardHeader className="px-0">
                <CardTitle className="text-2xl font-bold">Đăng ký</CardTitle>
                <CardDescription>Chào mừng bạn đến với chúng tôi!</CardDescription>
            </CardHeader>

            <CardContent className="px-0 space-y-6">

                <SocialLoginButton isLoading={isSubmitting} />

                <div className="flex items-center gap-3">
                    <Separator className="shrink" />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                        hoặc email
                    </span>
                    <Separator className="shrink" />
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel className="text-sm">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            autoComplete="email"
                                            placeholder="Nhập địa chỉ email của bạn"
                                            className="rounded-xl h-12"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="absolute left-3 -bottom-5 text-xs" />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-sm">Họ</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                autoComplete="family-name"
                                                placeholder="Nhập họ của bạn"
                                                className="rounded-xl h-12"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="absolute left-3 -bottom-5 text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="text-sm">Tên</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                autoComplete="given-name"
                                                placeholder="Nhập tên của bạn"
                                                className="rounded-xl h-12"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="absolute left-3 -bottom-5 text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel className="text-sm">Ngày sinh</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            placeholder="dd/mm/yyyy"
                                            className="rounded-xl h-12"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="absolute left-3 -bottom-5 text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel className="text-sm">Mật khẩu</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={isPasswordVisible ? "text" : "password"}
                                                autoComplete="new-password"
                                                className="rounded-xl h-12"
                                                placeholder="Nhập mật khẩu của bạn"
                                                {...field}
                                            />
                                        </FormControl>
                                        <PasswordButton
                                            isPasswordVisible={isPasswordVisible}
                                            setIsPasswordVisible={setIsPasswordVisible}
                                        />
                                    </div>
                                    <FormMessage className="absolute left-3 -bottom-5 text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel className="text-sm">Xác nhận mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            autoComplete="new-password"
                                            className="rounded-xl h-12"
                                            placeholder="Nhập lại mật khẩu của bạn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="absolute left-3 -bottom-5 text-xs" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full h-12 rounded-xl bg-primary text-foreground"
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                        >
                            Đăng ký
                        </Button>
                    </form>
                </Form>

                <p className="text-center text-sm text-muted-foreground">
                    Đã có tài khoản?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}
