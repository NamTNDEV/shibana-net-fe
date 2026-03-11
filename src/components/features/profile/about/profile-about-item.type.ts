import { ABOUT_ITEM_RENDER_LIST_TYPES, ABOUT_ITEM_TYPES, PRIVACY_TYPES } from "@/constants/profile-about";

export type AboutItemType = (typeof ABOUT_ITEM_TYPES)[keyof typeof ABOUT_ITEM_TYPES];
export type PrivacyType = (typeof PRIVACY_TYPES)[keyof typeof PRIVACY_TYPES];

export type AboutItemPropType = {
    type: AboutItemType;
    title: string;
    subtitle?: string;
    content: string | null;
    privacy: PrivacyType;
    isOwner?: boolean;
}

export type AboutItemRenderListType = (typeof ABOUT_ITEM_RENDER_LIST_TYPES)[keyof typeof ABOUT_ITEM_RENDER_LIST_TYPES];