"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import ProfileSetupScreen from "@/components/features/profile/profile-setup-screen";

export default function NotFoundPage() {
  const username = useAuthStore((state) => state.authUser?.username);
  const isProfileReady = useAuthStore((state) => state.authUser?.profileReady);
  const path = usePathname();
  if (username && path === `/@${username}`) {
    return (
      <ProfileSetupScreen />
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <p className="text-8xl font-extralight tabular-nums tracking-tighter text-muted-foreground/60">
        404
      </p>
      <h1 className="mt-4 text-xl font-medium text-foreground">
        Không tìm thấy trang
      </h1>
      <Button className="mt-8" size="lg">
        <Link href="/">Về trang chủ</Link>
      </Button>
    </div>
  );
}
