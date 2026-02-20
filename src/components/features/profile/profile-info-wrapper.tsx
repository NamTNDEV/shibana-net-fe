
import { Separator } from "@/components/ui/separator"
import { ProfileResponseDataType } from "@/types/profile.type"
import { getInitialName } from "@/lib/utils"
import ProfileAvatar from "./profile-avatar"
import ProfileDetails from "./profile-details"
import ProfileBio from "./profile-bio"

type ProfileInfoWrapperPropsType = {
    profile: ProfileResponseDataType;
}

export default function ProfileInfoWrapper({ profile }: ProfileInfoWrapperPropsType) {
    return (
        <section className="w-full flex flex-col items-center justify-center z-50 md:px-4 lg:px-3">
            <div className="w-full max-w-[73%] px-5 py-1">
                <div className="w-full mt-3 mb-4 flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
                    <div className="md:-mt-20 lg:mt-0 lg:py-1 lg:pl-1 lg:pr-3">
                        <ProfileAvatar
                            avatar={profile.avatar}
                            initialName={getInitialName(profile.firstName, profile.lastName)} />
                    </div>
                    <div className="flex-1 px-1 md:py-3">
                        <ProfileDetails firstName={profile.firstName} lastName={profile.lastName} />
                        <ProfileBio bio={profile.bio} />
                        {/* MetaList */}
                    </div>
                </div>
            </div>
            <div className="w-full lg:max-w-[74%] lg:px-6">
                <Separator className="w-full bg-[#ced1d5] h-0.5" />
            </div>
            <div className="h-10"></div>
        </section>
    )
}
