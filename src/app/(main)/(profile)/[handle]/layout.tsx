import ProfileSetupScreen from "@/components/features/profile/profile-setup-screen";
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
        return notFound();
    }

    const searchingUsername = decodedHandle.split("@")[1];
    const profile = await userService.safeGetProfileByUsername(getUsernameFromHandle(decodedHandle));
    if (!profile) {
        return (
            <ProfileSetupScreen searchingUsername={searchingUsername} />
        );
    }

    return (
        <main className="min-h-[calc(100vh-56px)]">
            <ProfileHeader profile={profile} />
            {children}
        </main>
    )
}
