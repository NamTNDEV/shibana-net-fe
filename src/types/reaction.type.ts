import { ReactionTargetType, ReactionType } from "@/constants/reaction-type";

export type ReactionRequestBodyType = {
    targetId: string;
    reactionType: ReactionType;
    targetType: ReactionTargetType;
}