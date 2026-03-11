import { AboutList } from "@/components/features/profile/about/profile-about-list"
import { ABOUT_ITEM_RENDER_LIST_TYPES } from "@/constants/profile-about"

type PersonalDetailsPagePropsType = {}

export default function PersonalDetailsPage({ }: PersonalDetailsPagePropsType) {
    return (
        <AboutList renderListType={ABOUT_ITEM_RENDER_LIST_TYPES.PERSONAL_DETAILS} />
    )
}
