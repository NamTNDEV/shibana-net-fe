import ProfileHeader from "@/components/layouts/headers/profile-header";
import { getUsernameFromHandle } from "@/lib/utils";
import { userService } from "@/services/user.service";
import { notFound } from "next/navigation";

export default async function ProfileLayout({
    params,
    children,
}: Readonly<{
    params: Promise<{ handle: string }>;
    children: React.ReactNode;
}>) {
    const decodedHandle = decodeURIComponent((await params).handle);
    if (!decodedHandle.startsWith("@")) {
        notFound();
    }

    const profile = await userService.safeGetProfileByUsername(getUsernameFromHandle(decodedHandle));
    if (!profile) {
        notFound();
    }

    return (
        <main className="min-h-[calc(100vh-56px)]">
            <ProfileHeader profile={profile} />
            {children}
        </main>
    )
}
