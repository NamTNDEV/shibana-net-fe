import MainHeader from "@/components/layouts/headers/main-header";
import MainLeftSidebar from "@/components/layouts/sidebars/main-left-sidebar";
import MainRightSidebar from "@/components/layouts/sidebars/main-right-sidebar";
import AuthProviders from "@/components/providers/auth.providers";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col relative">
            <MainHeader />

            <div className="flex bg-secondary">
                <MainLeftSidebar />

                <main className="flex-1 min-h-[calc(100vh-64px)] h-[3000px] px-8 pt-4">
                    {children}
                </main>

                <MainRightSidebar />
            </div>
        </div>
    )
}
