import { cookies } from "next/headers";

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