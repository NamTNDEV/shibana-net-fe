export const REACTION_TYPES = {
    LIKE: "LIKE",
    HEART: "HEART",
    HAHA: "HAHA",
    WOW: "WOW",
    SAD: "SAD",
    ANGRY: "ANGRY"
} as const;

export type ReactionType = typeof REACTION_TYPES[keyof typeof REACTION_TYPES];

export const REACTION_TARGET_TYPES = {
    POST: "POST",
    COMMENT: "COMMENT"
} as const;

export type ReactionTargetType = typeof REACTION_TARGET_TYPES[keyof typeof REACTION_TARGET_TYPES];