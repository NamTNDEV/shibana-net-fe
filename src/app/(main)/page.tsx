import ProfileItem from "@/components/features/profile/profile-item";

export default function HomePage() {
    return (
        <>
            <div className="w-full h-[60px] bg-white">
                <ProfileItem />
            </div>
            <div className="w-full h-[60px] bg-white">
                <ProfileItem />
            </div>
            <div className="w-full h-[60px] bg-white">
                <ProfileItem />
            </div>
        </>
    )
}
