import { API_ROUTES } from "@/constants/api-route";
import { httpClientV02 } from "@/lib/http-client-v02";
import { ReactionRequestBodyType } from "@/types/reaction.type";
import { ResponseDataType } from "@/types/response.type";

export const reactionService = {
    toggleReaction: async (body: ReactionRequestBodyType): Promise<ResponseDataType<void>> => {
        const response = await httpClientV02.post<void>(API_ROUTES.REACTIONS.TOGGLE_REACTION, { body });
        return response;
    }
}