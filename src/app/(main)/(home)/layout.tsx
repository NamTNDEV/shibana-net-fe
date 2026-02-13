import MainLeftSidebar from "@/components/layouts/sidebars/main-left-sidebar";
import MainRightSidebar from "@/components/layouts/sidebars/main-right-sidebar";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex bg-background">
                <MainLeftSidebar />

                <main className="flex-1 min-h-[calc(100vh-56px)] px-8 pt-4">
                    <div className="container mx-auto w-[70%] min-w-[600px] h-[3000px] flex flex-col items-center gap-3">
                        {children}
                    </div>
                </main>

                <MainRightSidebar />
            </div>
        </>
    )
}
