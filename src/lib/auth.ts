
import { authService } from "@/services/auth.service";
import { RefreshTokenRequestBodyType, RefreshTokenResponseDataType } from "@/types/auth.type";
import { getCookies } from "./cookies";

let promiseCached: Promise<RefreshTokenResponseDataType | null> | null = null;

export const handleRefreshToken = async (): Promise<RefreshTokenResponseDataType | null> => {
    if (promiseCached) {
        return promiseCached;
    }

    promiseCached = (async () => {
        try {
            const refreshToken = await getCookies("refreshToken");
            if (!refreshToken) {
                return null;
            }
            const data = await authService.refreshToken({ token: refreshToken });
            if (!data) {
                return null;
            }
            return data;
        } catch (error) {
            return null;
        } finally {
            promiseCached = null;
        }
    })();

    return promiseCached;
}
