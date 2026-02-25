import ProfileCover from "@/components/features/profile/profile-cover"
import ProfileInfoWrapper from "@/components/features/profile/profile-info-wrapper";
import { ProfileResponseDataType } from "@/types/profile.type";

type ProfileHeaderPropsType = {
    profile: ProfileResponseDataType;
}

export default function ProfileHeader({ profile }: ProfileHeaderPropsType) {
    return (
        <header className="bg-white shadow-sm">
            <div className="flex flex-col items-center justify-between">
                <ProfileCover coverUrl={"http://localhost:8888/api/v1/media/static/7edc6a51-e615-400d-b4b5-9ba58950584e.jpg"} userId={profile.userId} />
                <ProfileInfoWrapper profile={profile} />
            </div>
        </header>
    )
}   