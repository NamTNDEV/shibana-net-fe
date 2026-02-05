import type { ReactNode } from "react";
import AuthSidebar from "@/components/layouts/sidebars/auth-sidebar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12">
      <aside className="hidden lg:block col-span-7">
        <AuthSidebar />
      </aside>

      <div className="bg-background flex items-center justify-center px-8 py-8 sm:px-10 lg:px-12 col-span-5">
        <div className="w-full max-w-[650px] mx-auto bg-white rounded-lg px-6 py-8 shadow-md border border-gray-200 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
