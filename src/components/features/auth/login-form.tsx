"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"

import { LoginSchema } from "@/schemas/auth"
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

type LoginFormValues = z.infer<typeof LoginSchema>

export function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: LoginFormValues) => {
    // TODO: Tích hợp API đăng nhập tại đây
    console.log("Login with values", values)
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <Card className="w-full mx-auto border-none shadow-none bg-transparent p-0">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
        <CardDescription>Chào mừng bạn quay lại!</CardDescription>
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
            className="space-y-2"
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className="flex items-center justify-between mt-4">
                    <FormLabel className="text-sm">Mật khẩu</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        autoComplete="current-password"
                        className="rounded-xl h-12"
                        placeholder="Nhập mật khẩu của bạn"
                        {...field}
                      />
                      <PasswordButton
                        isPasswordVisible={isPasswordVisible}
                        setIsPasswordVisible={setIsPasswordVisible}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="absolute left-3 -bottom-5 text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-foreground mt-6"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Đăng nhập
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Đăng ký
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

