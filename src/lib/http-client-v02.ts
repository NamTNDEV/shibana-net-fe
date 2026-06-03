import envConfig from "@/config/env"
import { HttpError } from "./http-errors";
import { ResponseDataType } from "@/types/response.type";
import { getCookies } from "./cookies";
import { handleRefreshToken } from "./auth";

type HttpV02ClientOptions = Omit<RequestInit, "method" | "body"> & {
    body?: any
    baseUrl?: string
}

class HttpV02 {
    private baseUrl: string
    private static instance: HttpV02 | null = null;

    private constructor() {
        this.baseUrl = envConfig.NEXT_PUBLIC_API_BASE_URL;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new HttpV02();
        }
        return this.instance;
    }

    private async request<T>(
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        url: string,
        options?: HttpV02ClientOptions
    ): Promise<ResponseDataType<T>> {
        let body: any = options?.body;
        const isFormData = body instanceof FormData;

        const headers = {
            ...options?.headers,
        } as Record<string, string>;

        if (!isFormData && !headers["Content-Type"]) {
            headers["Content-Type"] = "application/json";
        }

        if (isFormData) {
            delete headers["Content-Type"];
        }

        if (!headers["Authorization"]) {
            const accessToken = await getCookies("accessToken");
            if (accessToken) {
                headers["Authorization"] = `Bearer ${accessToken}`;
            }
        }

        const baseUrl = options?.baseUrl || this.baseUrl;
        const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
        if (body && typeof body === "object" && !isFormData) {
            body = JSON.stringify(body);
        }

        let res: Response = await fetch(fullUrl, {
            ...options,
            headers,
            body,
            method,
        });

        // Refresh token
        if (!res.ok && res.status === 401) {
            const newTokens = await handleRefreshToken();
            if (newTokens && newTokens.accessToken) {
                headers["Authorization"] = `Bearer ${newTokens.accessToken}`;
                res = await fetch(
                    fullUrl, {
                    ...options,
                    headers,
                    body,
                    method,
                });
            } else {
                throw new HttpError(
                    {
                        status: 401,
                        payload: {
                            code: 401,
                            message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại."
                        }
                    }
                );
            }
        }

        let jsonResponse: ResponseDataType<any>;

        try {
            jsonResponse = await res.json();
        } catch (error) {
            jsonResponse = {
                code: 500,
                message: res.statusText || "Error parsing JSON",
                data: null,
            } as ResponseDataType<null>;
        }

        if (!res.ok) {
            throw new HttpError({ status: res.status, payload: jsonResponse });
        }

        return jsonResponse;
    }

    get<T>(url: string, options?: HttpV02ClientOptions): Promise<ResponseDataType<T>> {
        return this.request<T>("GET", url, options);
    }

    post<T>(url: string, options?: HttpV02ClientOptions): Promise<ResponseDataType<T>> {
        return this.request<T>("POST", url, options);
    }

    put<T>(url: string, options?: HttpV02ClientOptions): Promise<ResponseDataType<T>> {
        return this.request<T>("PUT", url, options);
    }

    delete<T>(url: string, options?: HttpV02ClientOptions): Promise<ResponseDataType<T>> {
        return this.request<T>("DELETE", url, options);
    }

    patch<T>(url: string, options?: HttpV02ClientOptions): Promise<ResponseDataType<T>> {
        return this.request<T>("PATCH", url, options);
    }
}

export const httpClientV02 = HttpV02.getInstance();