"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted/50 text-muted-foreground">
        <Lock className="size-8" strokeWidth={1.5} />
      </div>
      <h1 className="mt-6 text-2xl font-semibold text-foreground">
        403 - Không có quyền truy cập
      </h1>
      <p className="mt-2 max-w-sm text-center text-muted-foreground">
        Xin lỗi, bạn không có quyền truy cập vào tài nguyên này.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg">
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>
    </main>
  );
}
