import type { ReactNode } from "react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-secondary flex items-center justify-center px-8 py-8 sm:px-10 lg:px-12 col-span-5">
            {children}
        </div>
    );
}
