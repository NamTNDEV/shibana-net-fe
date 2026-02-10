import MainHeader from "@/components/layouts/headers/main-header";
import MainLeftSidebar from "@/components/layouts/sidebars/main-left-sidebar";
import MainRightSidebar from "@/components/layouts/sidebars/main-right-sidebar";
import AuthHydrate from "@/components/providers/auth.hydrate";
import { userService } from "@/services/user.service";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await userService.safeGetMe();
    return (
        <div className="flex min-h-screen flex-col relative">
            <AuthHydrate user={user} />
            <MainHeader user={user} />

            <div className="flex bg-background">
                <MainLeftSidebar />

                <main className="flex-1 min-h-[calc(100vh-56px)] px-8 pt-4">
                    <div className="container mx-auto w-1/2 min-w-[600px] h-[3000px] flex flex-col items-center gap-3">
                        {children}
                    </div>
                </main>

                <MainRightSidebar />
            </div>
        </div>
    )
}
