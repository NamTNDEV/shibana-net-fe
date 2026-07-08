export const REACTION_TYPES = {
    LIKE: "LIKE",
    LOVE: "LOVE",
    HAHA: "HAHA",
    WOW: "WOW",
    SAD: "SAD",
    ANGRY: "ANGRY"
} as const;

export type ReactionType = typeof REACTION_TYPES[keyof typeof REACTION_TYPES];