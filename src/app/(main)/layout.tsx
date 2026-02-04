import MainHeader from "@/components/layouts/headers/main-header";
import MainLeftSidebar from "@/components/layouts/sidebars/main-left-sidebar";
import MainRightSidebar from "@/components/layouts/sidebars/main-right-sidebar";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col relative">
            <MainHeader />

            <div className="flex">
                <MainLeftSidebar />

                <main className="flex-1 py-4">
                    {children}
                </main>

                <MainRightSidebar />
            </div>
        </div>
    )
}
