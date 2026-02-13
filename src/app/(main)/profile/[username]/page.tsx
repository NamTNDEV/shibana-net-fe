import ProfileItem from "@/components/features/profile/profile-item";
import { HttpError } from "@/lib/http-errors";
import { userService } from "@/services/user.service";
import { notFound } from "next/navigation";

export default async function ProfilePage(
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;
    try {
        const profile = await userService.getProfileByUsername(username);
    } catch (error) {
        if (error instanceof HttpError && error.payload.code == 4040105) {
            return notFound();
        } else {
            console.error("Error:: ", error);
        }
    }
    return (
        <>

        </>
    );
}
