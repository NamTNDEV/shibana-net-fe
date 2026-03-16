import { ABOUT_ITEM_RENDER_LIST_TYPES, ABOUT_ITEM_TYPES, PRIVACY_TYPES } from "@/constants/profile-about";
import { AboutItemPropType, AboutItemRenderListType, AboutItemType, PrivacyType } from "@/components/features/profile/about/profile-about-item.type";
import { Cake, Mail, Hand, MapPinHouse, Phone, Earth, Lock, Pencil } from "lucide-react";
import { MyAccountMetadataResponseDataType } from "@/types/user.type";
import { ProfileResponseDataType } from "@/types/profile.type";
import { cn } from "@/lib/utils";

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

export const getPrivacyIconByType = (type: PrivacyType, className?: string) => {
    const defaultClassName = 'size-5';
    const iconClassName = cn(defaultClassName, className);
    switch (type) {
        case PRIVACY_TYPES.PUBLIC:
            return <Earth className={iconClassName} />;
        case PRIVACY_TYPES.PRIVATE:
            return <Lock className={iconClassName} />;
    }
}

export const getPrivacyTitleByType = (type: PrivacyType) => {
    switch (type) {
        case PRIVACY_TYPES.PUBLIC:
            return "Công khai";
        case PRIVACY_TYPES.PRIVATE:
            return "Riêng tư";
    }
}

export const getPrivacyDescriptionByType = (type: PrivacyType) => {
    switch (type) {
        case PRIVACY_TYPES.PUBLIC:
            return "Bất kỳ ai ở trên hoặc ngoài Facebook";
        case PRIVACY_TYPES.PRIVATE:
            return "Chỉ bạn có thể xem";
    }
}

const generateBioItem = (content: string | null, privacy: PrivacyType) => {
    return {
        type: ABOUT_ITEM_TYPES.BIO,
        title: "Tiểu sử",
        content: content,
        privacy: privacy,
    }
}

const generateAddressItem = (content: string | null, privacy: PrivacyType) => {
    return {
        type: ABOUT_ITEM_TYPES.ADDRESS,
        title: "Địa chỉ",
        content: content,
        privacy: privacy,
    }
}

const generateDobItem = (content: string | null, privacy: PrivacyType) => {
    return {
        type: ABOUT_ITEM_TYPES.DOB,
        title: "Ngày sinh",
        content: content,
        privacy: privacy,
    }
}

const generatePhoneItem = (content: string | null, privacy: PrivacyType) => {

    return {
        type: ABOUT_ITEM_TYPES.PHONE,
        title: "Số điện thoại",
        content: content,
        privacy: privacy,
    }
}

const generateEmailItem = (content: string | null, privacy: PrivacyType) => {
    return {
        type: ABOUT_ITEM_TYPES.EMAIL,
        title: "Email",
        content: content,
        privacy: privacy,
    }
}

const checkIsOwner = (owner: MyAccountMetadataResponseDataType | null, profile: ProfileResponseDataType | null) => {
    if (!owner || !profile) return false;
    return owner.userId === profile.userId;
}

export const generateAboutItemList = (
    owner: MyAccountMetadataResponseDataType | null,
    profile: ProfileResponseDataType | null,
    renderListType: AboutItemRenderListType
): AboutItemPropType[] => {
    if (!profile) return [];
    const list: AboutItemPropType[] = [];
    switch (renderListType) {
        case ABOUT_ITEM_RENDER_LIST_TYPES.INTRO:
            if (!profile.bio.value && !checkIsOwner(owner, profile)) return [];
            list.push(generateBioItem(profile.bio.value, profile.bio.privacyLevel));
            break;
        case ABOUT_ITEM_RENDER_LIST_TYPES.PERSONAL_DETAILS:
            if (!profile.dob.value && !profile.address.value && !checkIsOwner(owner, profile)) return [];
            list.push(generateDobItem(profile.dob.value, profile.dob.privacyLevel));
            list.push(generateAddressItem(profile.address.value, profile.address.privacyLevel));
            break;
        case ABOUT_ITEM_RENDER_LIST_TYPES.CONTACT_INFO:
            const email = owner?.email || null;
            if (!profile.phoneNumber.value && !email && !checkIsOwner(owner, profile)) return [];
            list.push(generatePhoneItem(profile.phoneNumber.value, profile.phoneNumber.privacyLevel));
            list.push(generateEmailItem(email, profile.email.privacyLevel));
            break;
    }
    return list;
}