import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { REACTION_TARGET_TYPES, ReactionTargetType, ReactionType } from "@/constants/reaction-type";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export type UseToggleReactionProps = {
    targetId: string;
    targetType: ReactionTargetType;
}

// 💡 Tạo một Interface chung vì Post và Comment đều xài chung các field này
export interface ReactionEntity {
    id: string;
    requesterReactionType: ReactionType | null;
    reactionCounts: number;
    topReactions: Record<ReactionType, number> | null;
}

export const useToggleReactionMutation = ({ targetId, targetType }: UseToggleReactionProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (reactionType: ReactionType) => {
            const requestBody = { targetId, reactionType, targetType };

            await fetch(NEXT_SERVER_ROUTES.REACTIONS.TOGGLE_REACTION, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });
        },
        onMutate: async (reactionType: ReactionType) => {
            // 1. Xác định gốc Query Key dựa vào Type
            const baseQueryKey = targetType === REACTION_TARGET_TYPES.POST ? ["posts"] : ["comments"];

            // 2. Dừng mọi tác vụ fetch đang chạy đè lên nhánh key này
            await queryClient.cancelQueries({ queryKey: baseQueryKey });

            // 3. Chụp lại toàn bộ snapshot của nhánh key này để phòng hờ rollback
            const previousData = queryClient.getQueriesData({ queryKey: baseQueryKey });

            // 4. 🚀 QUÉT VÀ CẬP NHẬT MỌI NGĂN KÉO LIÊN QUAN (Newsfeed, Detail, Profile, Reply...)
            queryClient.setQueriesData({ queryKey: baseQueryKey }, (oldData: any) => {
                if (!oldData) return oldData;
                const newData = JSON.parse(JSON.stringify(oldData)); // Deep copy

                // Trạng thái 1: Nếu data là danh sách phân trang (CursorResponse / InfiniteQuery)
                if (newData.pages) {
                    for (const page of newData.pages) {
                        const item = page.payload?.find((p: any) => p.id === targetId);
                        if (item) {
                            handleOptimisticUpdateReaction(item, reactionType);
                            return newData; // Cập nhật xong mảng này là return luôn
                        }
                    }
                }
                // Trạng thái 2: Nếu data là Object đơn lẻ (Detail)
                else if (newData.id === targetId) {
                    handleOptimisticUpdateReaction(newData, reactionType);
                }

                return newData;
            });

            return { previousData, baseQueryKey };
        },
        onError: (error, _, context) => {
            console.error(`❌ Error toggling reaction: `, error);
            // 5. Rollback lại toàn bộ snapshot nếu Server báo lỗi
            if (context?.previousData) {
                context.previousData.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },
    });
}

// 💡 Đổi type sang ReactionEntity để nhận cả Post lẫn Comment
const handleOptimisticUpdateReaction = (item: ReactionEntity, newReactionType: ReactionType) => {
    const oldReactionType = item.requesterReactionType;
    const isRemoving = oldReactionType === newReactionType;
    const isUpdating = !isRemoving && oldReactionType !== null;

    // --- Update top reactions ---
    if (!item.topReactions) item.topReactions = {} as Record<ReactionType, number>;

    if (isRemoving) {
        if (item.topReactions[oldReactionType] && item.topReactions[oldReactionType] > 0) {
            item.topReactions[oldReactionType] -= 1;
            if (item.topReactions[oldReactionType] === 0) {
                delete item.topReactions[oldReactionType];
            }
        }
    }

    if (isUpdating) {
        if (item.topReactions[oldReactionType] && item.topReactions[oldReactionType] > 0) {
            item.topReactions[oldReactionType] -= 1;
            if (item.topReactions[oldReactionType] === 0) {
                delete item.topReactions[oldReactionType];
            }
        }
        if (!item.topReactions[newReactionType]) item.topReactions[newReactionType] = 0;
        item.topReactions[newReactionType] += 1;
    }

    if (!isRemoving && !isUpdating) {
        if (!item.topReactions[newReactionType]) item.topReactions[newReactionType] = 0;
        item.topReactions[newReactionType] += 1;
    }

    // Sort lại Top Reactions
    item.topReactions = Object.fromEntries(
        Object.entries(item.topReactions)
            .sort(([, countA], [, countB]) => countB - countA)
    ) as Record<ReactionType, number>;

    // --- Update requester reaction type ---
    item.requesterReactionType = isRemoving ? null : newReactionType;

    // --- Update reaction counts ---
    item.reactionCounts = Math.max(0, item.reactionCounts + (isRemoving ? -1 : isUpdating ? 0 : 1));
};