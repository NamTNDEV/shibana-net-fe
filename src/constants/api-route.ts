export const API_ROUTES = {
    AUTH: {
        LOGIN: "identity/auth/login",
        REGISTER: "identity/auth/register",
        INTROSPECT: "identity/auth/introspect",
        LOGOUT: "identity/auth/logout",
        REFRESH_TOKEN: "identity/auth/refresh-token",
    },
    USERS: {
        HELLO_WORLD: "identity/users/hello-world",
        MY_ACCOUNT: "identity/users/me/account",
    },
    PROFILES: {
        PROFILE_BY_USERNAME: "social/profiles/:username",
        UPDATE_COVER_IMAGE: "social/profiles/me/cover",
        UPDATE_AVATAR_IMAGE: "social/profiles/me/avatar",
        UPDATE_PROFILE: "social/profiles/me",
    },
    MEDIA: {
        UPLOAD_IMAGE: "media/upload",
    },
    PRIVACIES: {
        GET_LIST: "social/privacies",
    },
    CONNECTIONS: {
        FOLLOW: "social/follows",
        UNFOLLOW: "social/follows/:followeeId",
        SEND_FRIEND_REQUEST: "social/friendships/send-request/:recieverId",
        ACCEPT_FRIEND_REQUEST: "social/friendships/accept-request/:recieverId",
        REJECT_FRIEND_REQUEST: "social/friendships/reject-request/:recieverId",
        UNFRIEND: "social/friendships/unfriend/:recieverId",
        REVOKE_FRIEND_REQUEST: "social/friendships/revoke-request/:revokeeId",
        BLOCK_USER: "social/blocks/:blockeeId",
        UNBLOCK_USER: "social/blocks/:blockeeId",
    },
    POSTS: {
        GET_NEWSFEED: "posts/newsfeed?page=:page&size=:size",
    }
} as const;

export const NEXT_SERVER_ROUTES = {
    PRIVACIES: {
        GET_LIST: "/api/privacies",
    },
    POSTS: {
        GET_NEWSFEED: "/api/posts/newsfeed?page=:page&size=:size",
    }
}