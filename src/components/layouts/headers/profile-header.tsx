import ProfileCover from "@/components/features/profile/header/cover/profile-cover"
import ProfileInfoWrapper from "@/components/features/profile/header/profile-info-wrapper";
import { ProfileResponseDataType } from "@/types/profile.type";

type ProfileHeaderPropsType = {
    profile: ProfileResponseDataType;
}

export default function ProfileHeader({ profile }: ProfileHeaderPropsType) {
    return (
        <header className="bg-white shadow-sm">
            <div className="flex flex-col items-center justify-between">
                <ProfileCover
                    coverUrl={profile.cover ?? undefined}
                    coverPositionY={profile.coverPositionY}
                    userId={profile.userId} />
                <ProfileInfoWrapper
                    profile={profile}
                />
            </div>
        </header>
    )
}   