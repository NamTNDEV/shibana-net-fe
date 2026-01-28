import type { ReactNode } from "react";
import AuthSidebar from "@/components/layouts/auth/auth-sidebar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left column: branding sidebar (desktop only) */}
      <div className="hidden lg:block">
        <AuthSidebar />
      </div>

      {/* Right column: form container */}
      <div className="bg-white flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
