import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { TokenType } from "@/constants/token-type";

export const getCookies = async (name: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
}

export const setCookies = async ({ name, value, options = {} }: { name: string, value: string, options?: any }) => {
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
        httpOnly: true,
        ...options,
    });
}

export const deleteCookies = async (name: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(name);
    // C2
    /**
     * cookieStore.set(name, "", {
     *  maxAge: 0,
     * });
     */
}

export const setTokenToCookie = async ({ token, tokenType, options }: { token: string, tokenType: TokenType, options?: any }) => {
    const { exp } = jwtDecode(token);

    const expires = new Date((exp ?? 0) * 1000);
    const defaultOptions = {
        httpOnly: true,
        sameSite: "lax" as const,
        path: "/",
    };

    await setCookies({
        name: tokenType,
        value: token,
        options: {
            ...defaultOptions,
            ...options,
            expires,
        }
    })
}
