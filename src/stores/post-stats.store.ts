import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type PostStatsStoreType = {
    commentCounts: Record<string, number>;
    initCommentCount: (postId: string, count: number) => void;
    adjustCommentCount: (postId: string, delta: number) => void;

}

export const usePostStatsStore = create<PostStatsStoreType>()(
    devtools(
        (set) => ({
            commentCounts: {},
            initCommentCount: (postId, initialCount) => set((state) => {
                if (state.commentCounts[postId] !== undefined) return state;
                return { commentCounts: { ...state.commentCounts, [postId]: initialCount } };
            }),
            adjustCommentCount: (postId, delta) => set((state) => ({
                commentCounts: {
                    ...state.commentCounts,
                    [postId]: Math.max(0, (state.commentCounts[postId] || 0) + delta)
                }
            })),
        }),
        { name: "PostStatsStore" }
    )
)