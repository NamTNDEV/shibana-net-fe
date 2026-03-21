export const FRIENDSHIP_STATUS = {
    NONE: "NONE",
    SENT_REQUEST: "SENT_REQUEST",
    RECEIVED_REQUEST: "RECEIVED_REQUEST",
    FRIENDED: "FRIENDED",
    BE_REJECTED: "BE_REJECTED",
} as const;

export type FriendshipStatusResponseType = (typeof FRIENDSHIP_STATUS)[keyof typeof FRIENDSHIP_STATUS];