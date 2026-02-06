"use client";

import { Bell, LogOut, MessageCircle, User, ChevronDown, Loader2 } from "lucide-react";
import Link from "next/link";

import { logoutAction } from "@/actions/auth.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth.store";
import { ROUTES } from "@/constants/routes";
import { getUrlWithParams } from "@/lib/utils";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

function getInitials(firstName: string, lastName: string): string {
  const first = firstName?.trim().charAt(0) ?? "";
  const last = lastName?.trim().charAt(0) ?? "";
  return (first + last).toUpperCase() || "?";
}

export function HeaderAction() {
  const { authUser: user, logout, isHydrated } = useAuthStore();

  const handleLogout = async () => {
    await logoutAction();
    logout();
    toast.success("Đăng xuất thành công.", {
      position: "bottom-right",
      richColors: true,
      duration: 1000,
    });
  };

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-end gap-3">
        <Skeleton className="size-10 rounded-full bg-secondary" />
        <Skeleton className="size-10 rounded-full bg-secondary" />
        <Skeleton className="size-10 rounded-full bg-secondary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-end gap-3">
        <Link href="/login">
          <Button variant="default" className="rounded-b-sm">
            Đăng nhập
          </Button>
        </Link>

        <Link href="/register" className="text-primary hover:underline">
          Đăng ký
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full size-10 bg-background"
        aria-label="Tin nhắn"
      >
        <MessageCircle className="size-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full size-10 bg-background"
        aria-label="Thông báo"
      >
        <Bell className="size-5" />
      </Button>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="relative focus-visible:ring-ring flex items-center rounded-full 
            outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:cursor-pointer hover:opacity-90 
            border border-foreground hover:border-primary group"
            aria-label="Menu người dùng"
          >
            <Avatar className="size-10">
              <AvatarImage src={user.avatar ?? undefined} alt={user.firstName} />
              <AvatarFallback>
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>

            <div className="absolute bottom-0 right-0 size-4 bg-white rounded-full flex items-center justify-center">
              <ChevronDown className="size-3 bg-background rounded-full group-hover:text-primary" />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href={getUrlWithParams(ROUTES.USER.PROFILE, { userId: user.userId })}
              className="flex items-center gap-2 cursor-pointer focus:bg-accent/80"
            >
              <User className="size-4" />
              Trang cá nhân
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <LogOut className="size-4" />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
