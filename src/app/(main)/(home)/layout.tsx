import MainLeftSidebar from "@/components/layouts/sidebars/main-left-sidebar";
import MainRightSidebar from "@/components/layouts/sidebars/main-right-sidebar";
import ProfileBackgroundSync from "@/components/providers/profile-sync";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex bg-background">
                <MainLeftSidebar />
                <main className="flex-1 min-h-[calc(100vh-56px)] pt-4 md:px-8">
                    {children}
                </main>
                <MainRightSidebar />
            </div>
        </>
    )
}
