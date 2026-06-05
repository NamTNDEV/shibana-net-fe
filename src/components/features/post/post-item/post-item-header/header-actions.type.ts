import { PostResponseDataType } from "@/types/post.type";

export type PostItemActionType = 'PIN' | 'VIEW_HISTORY' | 'EDIT_POST' | 'EDIT_PRIVACY' | 'STORE' | 'DELETE';
export type ActionItemGroupType = {
    id: number;
    items: HeaderActionItemProps[];
}

// Props types

export type HeaderActionsButtonProps = {
    post: PostResponseDataType
}
export type HeaderActionItemProps = {
    icon: React.ElementType;
    title: string;
    actionType: PostItemActionType;
    description?: string;
    onActionTypeChange?: (actionType: PostItemActionType) => void;
}