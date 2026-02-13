import MainHeader from "@/components/layouts/headers/main-header";
import AuthHydrate from "@/components/providers/auth.hydrate";
import { userService } from "@/services/user.service";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await userService.safeGetMyAccountMetadata();
    return (
        <div className="flex min-h-screen flex-col relative">
            <AuthHydrate user={user} />
            <MainHeader user={user} />

            {children}
        </div>
    )
}
