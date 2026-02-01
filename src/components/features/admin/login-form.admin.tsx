"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdminLoginIcon } from "@/assets";
import { LoginSchema } from "@/schemas/auth.schema";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import PasswordButton from "../auth/password-button";
import { loginAction } from "@/actions/auth.action";
import { toast } from "sonner";
import { getSafeRedirectUrl } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";

type AdminLoginFormValuesType = z.infer<typeof LoginSchema>

export function AdminLoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const router = useRouter()

  const form = useForm<AdminLoginFormValuesType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: AdminLoginFormValuesType) => {
    const response = await loginAction(values)
    if (response.success) {
      toast.success(response.message, {
        position: "top-right",
        richColors: true,
        duration: 3000,
      })
      form.reset()
      router.push(ROUTES.ADMIN.DASHBOARD)
    } else {
      if (response.code === 4000702) {
        form.setError("root", {
          message: response.message,
        })
      } else {
        toast.error(response.message, {
          position: "top-right",
          richColors: true,
          duration: 3000,
        })
      }
      form.setValue("password", "")
    }
  }

  return (
    <Card className="w-full max-w-[400px] rounded-xl border border-border bg-card px-6 py-8 shadow-lg">
      <CardHeader className="flex flex-col items-center justify-center p-0">
        <div
          className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary"
          aria-hidden
        >
          <AdminLoginIcon className="size-6" />
        </div>
        <CardTitle className="text-2xl font-bold p-0">Admin Portal</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-0">
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
      </CardContent>
    </Card>
  );
}
