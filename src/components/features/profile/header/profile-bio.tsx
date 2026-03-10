export type ProfileBioPropsType = {
    bio: string | null;
}

export default function ProfileBio({ bio }: ProfileBioPropsType) {
    return (
        <div className="md:text-left md:pt-3 lg:pt-0">
            <p className="w-full text-center lg:text-left lg:pt-1 text-sm text-gray-500">{bio}</p>
        </div>
    )
}
