import { ABOUT_ITEM_RENDER_LIST_TYPES, ABOUT_ITEM_TYPES, PRIVACY_TYPES } from "@/constants/profile-about";
import { AboutItemPropType, AboutItemRenderListType, AboutItemType, PrivacyType } from "@/components/features/profile/about/profile-about-item.type";
import { Cake, Mail, Hand, MapPinHouse, Phone, Earth, Lock, Users } from "lucide-react";
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
        case PRIVACY_TYPES.FRIENDS:
            return <Users className={iconClassName} />;
    }
}

export const getPrivacyTitleByType = (type: PrivacyType) => {
    switch (type) {
        case PRIVACY_TYPES.PUBLIC:
            return "Công khai";
        case PRIVACY_TYPES.PRIVATE:
            return "Riêng tư";
        case PRIVACY_TYPES.FRIENDS:
            return "Bạn bè";
    }
}

export const getPrivacyDescriptionByType = (type: PrivacyType) => {
    switch (type) {
        case PRIVACY_TYPES.PUBLIC:
            return "Bất kỳ ai ở trên hoặc ngoài Facebook";
        case PRIVACY_TYPES.PRIVATE:
            return "Chỉ bạn có thể xem";
        case PRIVACY_TYPES.FRIENDS:
            return "Chỉ bạn bè có thể xem";
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

export const generateAboutItemList = (
    profile: ProfileResponseDataType | null,
    renderListType: AboutItemRenderListType
): AboutItemPropType[] => {
    if (!profile) return [];
    const list: AboutItemPropType[] = [];
    switch (renderListType) {
        case ABOUT_ITEM_RENDER_LIST_TYPES.INTRO:
            if (!profile.bio.value && !profile.viewerContext.isOwner) return [];
            list.push({
                ...generateBioItem(profile.bio.value, profile.bio.privacyLevel),
                viewerContext: profile.viewerContext,
            });
            break;
        case ABOUT_ITEM_RENDER_LIST_TYPES.PERSONAL_DETAILS:
            if (!profile.dob.value && !profile.address.value && !profile.viewerContext.isOwner) return [];
            list.push({
                ...generateDobItem(profile.dob.value, profile.dob.privacyLevel),
                viewerContext: profile.viewerContext,
            });
            list.push({
                ...generateAddressItem(profile.address.value, profile.address.privacyLevel),
                viewerContext: profile.viewerContext,
            });
            break;
        case ABOUT_ITEM_RENDER_LIST_TYPES.CONTACT_INFO:
            const email = profile?.email.value || null;
            if (!profile.phoneNumber.value && !email && !profile.viewerContext.isOwner) return [];
            list.push({
                ...generatePhoneItem(profile.phoneNumber.value, profile.phoneNumber.privacyLevel),
                viewerContext: profile.viewerContext,
            });
            list.push({
                ...generateEmailItem(email, profile.email.privacyLevel),
                viewerContext: profile.viewerContext,
            });
            break;
    }
    return list;
}