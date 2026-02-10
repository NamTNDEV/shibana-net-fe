import { authService } from "@/services/auth.service";
import { RefreshTokenResponseDataType } from "@/types/auth.type";
import { deleteCookies, getCookies, setAuthCookie } from "./cookies";
import { TOKEN_TYPE } from "@/constants/token-type";

let promiseCached: Promise<RefreshTokenResponseDataType | null> | null = null;

export const handleRefreshToken = async (): Promise<RefreshTokenResponseDataType | null> => {
    if (promiseCached) {
        return promiseCached;
    }

    promiseCached = (async () => {
        try {
            const refreshToken = await getCookies("refreshToken");
            if (!refreshToken) return null;

            const data = await authService.refreshToken({ token: refreshToken });
            if (!data) return null;

            await setAuthCookie({ token: data.accessToken, tokenType: TOKEN_TYPE.ACCESS_TOKEN });
            await setAuthCookie({ token: data.refreshToken, tokenType: TOKEN_TYPE.REFRESH_TOKEN });

            return data;
        } catch (error) {
            return null;
        } finally {
            promiseCached = null;
        }
    })();

    return promiseCached;
}

export const handleLogout = async () => {
    await deleteCookies(TOKEN_TYPE.ACCESS_TOKEN);
    await deleteCookies(TOKEN_TYPE.REFRESH_TOKEN);
}
