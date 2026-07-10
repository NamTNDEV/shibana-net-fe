import { NEXT_SERVER_ROUTES } from "@/constants/api-route";
import { REACTION_TARGET_TYPES, ReactionTargetType, ReactionType } from "@/constants/reaction-type";
import { PostResponseDataType } from "@/types/post.type";
import { ReactionRequestBodyType } from "@/types/reaction.type";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export type UseToggleReactionProps = {
    targetId: string;
    targetType: ReactionTargetType;
    queryKey: any[];
}

export const useToggleReactionMutation = ({ targetId, targetType, queryKey }: UseToggleReactionProps) => {
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
            await queryClient.cancelQueries({ queryKey });
            const previousData = queryClient.getQueryData(queryKey);

            queryClient.setQueryData(queryKey, (oldData: any) => {
                if (!oldData) return oldData;
                const newData = JSON.parse(JSON.stringify(oldData));

                switch (targetType) {
                    case REACTION_TARGET_TYPES.POST:
                        if (newData.pages && newData.pages.length > 0) {
                            for (const page of newData.pages) {
                                const post: PostResponseDataType = page.payload.find((p: any) => p.id === targetId);
                                if (post) {
                                    handleOptimisticUpdateReaction(post, reactionType);
                                    break;
                                }
                            }
                        }
                }
                return newData;
            });

            return { previousData };
        },
        onError: (error, _, context) => {
            console.error(`❌ Error toggling reaction: `, error);
            queryClient.setQueryData(queryKey, context?.previousData);
        },
    });
}

const handleOptimisticUpdateReaction = (item: PostResponseDataType, newReactionType: ReactionType) => {
    const isRemoveReaction = item.requesterReactionType === newReactionType;
    if (isRemoveReaction && (!item.topReactions || !item.topReactions)) return;

    // --- Update requester reaction type ---
    item.requesterReactionType = isRemoveReaction ? null : newReactionType;

    // --- Update reaction counts ---
    item.reactionCounts = Math.max(0, item.reactionCounts + (isRemoveReaction ? -1 : 1));

    // --- Update top reactions ---


};