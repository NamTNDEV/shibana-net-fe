"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import { LoginSchema } from "@/schemas/auth.schema"
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
import { useRouter } from "next/navigation"
import { loginAction } from "@/actions/auth.action"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { getSafeRedirectUrl } from "@/lib/utils"

type LoginFormValuesType = z.infer<typeof LoginSchema>

export function LoginForm({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const router = useRouter()
  const params = use(searchParams)
  const redirectUrl = params.redirect || null

  useEffect(() => {
    if (redirectUrl) {
      toast.info("Vui lòng đăng nhập để tiếp tục.", {
        position: "bottom-right",
        richColors: true,
        duration: 1000
      })
    }
  }, [redirectUrl])

  const form = useForm<LoginFormValuesType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: LoginFormValuesType) => {
    const response = await loginAction(values)
    if (response.success) {
      toast.success(response.message, {
        position: "bottom-right",
        richColors: true,
        duration: 1000,
      })
      form.reset()
      router.push(getSafeRedirectUrl(redirectUrl))
    } else {
      if (response.code === 4000702) {
        form.setError("root", {
          message: response.message,
        })
      } else {
        toast.error(response.message, {
          position: "bottom-right",
          richColors: true,
          duration: 1000,
        })
      }
      form.setValue("password", "")
    }
  }

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

        {form.formState.errors.root && (
          <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 border-destructive">
            <AlertCircleIcon className="size-4" />
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form
            className="space-y-2"
            onSubmit={form.handleSubmit(onSubmit)}
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
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
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

