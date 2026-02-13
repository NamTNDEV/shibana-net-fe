import ProfileItem from "@/components/features/profile/profile-item";
import { userService } from "@/services/user.service";

export default async function ProfilePage(
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;
    // const profile = await userService.getProfileByUsername(username);
    // console.log("profile::", profile)
    return (
        <>
        </>
    );
}
