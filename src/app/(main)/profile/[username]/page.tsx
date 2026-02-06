import ProfileItem from "@/components/features/profile/profile-item";

export default async function ProfilePage(
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;
    return <div>
        ProfilePage:: Username: {username}
        <ProfileItem />
    </div>;
}
