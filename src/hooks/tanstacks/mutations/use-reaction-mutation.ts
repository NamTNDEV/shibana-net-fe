import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { REACTION_TARGET_TYPES, ReactionTargetType, ReactionType } from "@/constants/reaction-type";
import { PostResponseDataType } from "@/types/post.type";
import { ReactionRequestBodyType } from "@/types/reaction.type";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export type UseToggleReactionProps = {
    targetId: string;
    targetType: ReactionTargetType;
}

export const useToggleReactionMutation = ({ targetId, targetType }: UseToggleReactionProps) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (reactionType: ReactionType) => {
            const requestBody: ReactionRequestBodyType = {
                targetId,
                reactionType,
                targetType
            };

            await fetch(NEXT_SERVER_ROUTES.REACTIONS.TOGGLE_REACTION, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
        },
        onMutate: async (reactionType: ReactionType) => {
            // 1. Khai báo định danh của 2 ngăn kéo
            const newsfeedKey = ["posts", "newsfeed", "cursor-based"];
            const detailKey = ["posts", "detail", targetId];

            // 2. Dừng mọi tác vụ fetch đang chạy đè lên 2 key này
            await queryClient.cancelQueries({ queryKey: newsfeedKey });
            await queryClient.cancelQueries({ queryKey: detailKey });

            // 3. Snapshot (chụp lại) dữ liệu cũ để phòng hờ rollback
            const previousNewsfeed = queryClient.getQueryData(newsfeedKey);
            const previousDetail = queryClient.getQueryData(detailKey);

            // 💡 BÍ KÍP 2.1: CẬP NHẬT CACHE NEWSFEED (Dạng mảng phân trang)
            queryClient.setQueryData(newsfeedKey, (oldData: any) => {
                if (!oldData) return oldData;
                const newData = JSON.parse(JSON.stringify(oldData));

                if (targetType === REACTION_TARGET_TYPES.POST && newData.pages) {
                    for (const page of newData.pages) {
                        const post = page.payload.find((p: any) => p.id === targetId);
                        if (post) {
                            handleOptimisticUpdateReaction(post, reactionType);
                            break; // Cập nhật xong là thoát vòng lặp
                        }
                    }
                }
                return newData;
            });

            // 💡 BÍ KÍP 2.2: CẬP NHẬT CACHE DETAIL (Dạng Object đơn lẻ)
            if (targetType === REACTION_TARGET_TYPES.POST) {
                queryClient.setQueryData(detailKey, (oldDetail: any) => {
                    if (!oldDetail) return oldDetail;
                    const newDetail = JSON.parse(JSON.stringify(oldDetail));
                    handleOptimisticUpdateReaction(newDetail, reactionType);
                    return newDetail;
                });
            }

            // Trả về context chứa cả 2 bản snapshot
            return { previousNewsfeed, previousDetail, newsfeedKey, detailKey };
        },
        onError: (error, _, context) => {
            console.error(`❌ Error toggling reaction: `, error);
            // Rollback lại cả 2 ngăn kéo nếu Server báo lỗi
            if (context) {
                queryClient.setQueryData(context.newsfeedKey, context.previousNewsfeed);
                queryClient.setQueryData(context.detailKey, context.previousDetail);
            }
        },
    });
}

const handleOptimisticUpdateReaction = (item: PostResponseDataType, newReactionType: ReactionType) => {
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
        if (!item.topReactions[newReactionType]) {
            item.topReactions[newReactionType] = 0;
        }
        item.topReactions[newReactionType] += 1;
    }

    if (!isRemoving && !isUpdating) {
        if (!item.topReactions[newReactionType]) {
            item.topReactions[newReactionType] = 0;
        }
        item.topReactions[newReactionType] += 1;
    }
    item.topReactions = Object.fromEntries(
        Object.entries(item.topReactions)
            .sort(([, countA], [, countB]) => countB - countA)
    ) as Record<ReactionType, number>;

    // --- Update requester reaction type ---
    item.requesterReactionType = isRemoving ? null : newReactionType;
    // --- Update reaction counts ---
    item.reactionCounts = Math.max(0, item.reactionCounts + (isRemoving ? -1 : isUpdating ? 0 : 1));

};