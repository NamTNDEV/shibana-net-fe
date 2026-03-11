import { ABOUT_ITEM_RENDER_LIST_TYPES, ABOUT_ITEM_TYPES, PRIVACY_TYPES } from "@/constants/profile-about";
import { AboutItemPropType, AboutItemRenderListType, AboutItemType, PrivacyType } from "@/components/features/profile/about/profile-about-item.type";
import { Cake, Mail, Hand, MapPinHouse, Phone, Earth, Lock, Pencil } from "lucide-react";
import { MyAccountMetadataResponseDataType } from "@/types/user.type";
import { ProfileResponseDataType } from "@/types/profile.type";

export const getTitleWhenContentIsEmpty = (type: AboutItemType) => {
    switch (type) {
        case ABOUT_ITEM_TYPES.BIO:
            return "Giới thiệu về bạn";
        case ABOUT_ITEM_TYPES.ADDRESS:
            return "Địa chỉ của bạn";
        case ABOUT_ITEM_TYPES.DOB:
            return "Ngày sinh của bạn";
        case ABOUT_ITEM_TYPES.PHONE:
            return "Số điện thoại của bạn";
        case ABOUT_ITEM_TYPES.EMAIL:
            return "Email của bạn";
    }
}

export const getIconByType = (type: AboutItemType) => {
    const iconClassName = 'size-6';
    switch (type) {
        case ABOUT_ITEM_TYPES.BIO:
            return <Hand className={iconClassName} />;
        case ABOUT_ITEM_TYPES.ADDRESS:
            return <MapPinHouse className={iconClassName} />;
        case ABOUT_ITEM_TYPES.DOB:
            return <Cake className={iconClassName} />;
        case ABOUT_ITEM_TYPES.PHONE:
            return <Phone className={iconClassName} />;
        case ABOUT_ITEM_TYPES.EMAIL:
            return <Mail className={iconClassName} />;
    }
}

export const getPrivacyIconByType = (type: PrivacyType) => {
    const iconClassName = 'size-5';
    switch (type) {
        case PRIVACY_TYPES.PUBLIC:
            return <Earth className={iconClassName} />;
        case PRIVACY_TYPES.PRIVATE:
            return <Lock className={iconClassName} />;
    }
}

const generateBioItem = (content: string | null) => {
    return {
        type: ABOUT_ITEM_TYPES.BIO,
        title: "Tiểu sử",
        content: content || "Hello World ☕☕",
        privacy: PRIVACY_TYPES.PUBLIC,
    }
}

const generateAddressItem = (content: string | null) => {
    return {
        type: ABOUT_ITEM_TYPES.ADDRESS,
        title: "Địa chỉ",
        content: content || "666 Đường ABC, Quận XYZ, TP. HCM",
        privacy: PRIVACY_TYPES.PUBLIC,
    }
}

const generateDobItem = (content: string | null) => {
    return {
        type: ABOUT_ITEM_TYPES.DOB,
        title: "Ngày sinh",
        content: content || "12/12/1990",
        privacy: PRIVACY_TYPES.PUBLIC,
    }
}

const generatePhoneItem = (content: string | null) => {

    return {
        type: ABOUT_ITEM_TYPES.PHONE,
        title: "Số điện thoại",
        content: content || "0909090909",
        privacy: PRIVACY_TYPES.PUBLIC,
    }
}

const generateEmailItem = (content: string | null) => {
    return {
        type: ABOUT_ITEM_TYPES.EMAIL,
        title: "Email",
        content: content || "example@example.com",
        privacy: PRIVACY_TYPES.PUBLIC,
    }
}
export const generateAboutItemList = (
    owner: MyAccountMetadataResponseDataType | null,
    profile: ProfileResponseDataType | null,
    renderListType: AboutItemRenderListType
): AboutItemPropType[] => {
    if (!profile || !owner) return [];
    const list: AboutItemPropType[] = [];
    switch (renderListType) {
        case ABOUT_ITEM_RENDER_LIST_TYPES.INTRO:
            list.push(generateBioItem(profile.bio));
            break;
        case ABOUT_ITEM_RENDER_LIST_TYPES.PERSONAL_DETAILS:
            list.push(generateDobItem(profile.dob));
            list.push(generateAddressItem(profile.address));
            break;
        case ABOUT_ITEM_RENDER_LIST_TYPES.CONTACT_INFO:
            list.push(generatePhoneItem(profile.phoneNumber));
            list.push(generateEmailItem(owner.email));
            break;
    }
    return list;
}