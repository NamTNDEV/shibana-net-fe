import { AboutList } from "@/components/features/profile/about/profile-about-list"
import { ABOUT_ITEM_RENDER_LIST_TYPES } from "@/constants/profile-about"

type ContactInfoPagePropsType = {}

export default function ContactInfoPage({ }: ContactInfoPagePropsType) {
    return (
        <AboutList renderListType={ABOUT_ITEM_RENDER_LIST_TYPES.CONTACT_INFO} />
    )
}
