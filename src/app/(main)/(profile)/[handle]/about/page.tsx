import { AboutList } from "@/components/features/profile/about/profile-about-list"
import { ABOUT_ITEM_RENDER_LIST_TYPES } from "@/constants/profile-about"

type ProfileAboutPagePropType = {}

export default function ProfileAboutPage({ }: ProfileAboutPagePropType) {
    return (
        <AboutList renderListType={ABOUT_ITEM_RENDER_LIST_TYPES.INTRO} />
    )
}