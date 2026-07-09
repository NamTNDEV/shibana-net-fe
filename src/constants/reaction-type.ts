export const REACTION_TYPES = {
    LIKE: "LIKE",
    HEART: "HEART",
    HAHA: "HAHA",
    WOW: "WOW",
    SAD: "SAD",
    ANGRY: "ANGRY"
} as const;

export type ReactionType = typeof REACTION_TYPES[keyof typeof REACTION_TYPES];