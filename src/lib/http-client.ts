import envConfig from "@/config/env"
import { HttpError } from "./http-errors";
import { ResponseDataType } from "@/types/response.type";

type HttpClientOptions = Omit<RequestInit, "method" | "body"> & {
    body?: any
    baseUrl?: string
}

class Http {
    private baseUrl: string

    constructor() {
        this.baseUrl = envConfig.NEXT_PUBLIC_API_BASE_URL;
    }

    private async request<T>(
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        url: string,
        options?: HttpClientOptions
    ): Promise<T> {
        let body: any = options?.body;
        const headers = {
            "Content-Type": "application/json",
            ...options?.headers,
        };
        const baseUrl = options?.baseUrl || this.baseUrl;
        const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;

        if (body && typeof body === "object") {
            body = JSON.stringify(body);
        }

        const res = await fetch(fullUrl, {
            ...options,
            headers,
            body,
            method,
        });

        let payload: ResponseDataType<any>;
        try {
            payload = await res.json();
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            payload = {
                code: 5000000,
                message: res.statusText || "Empty or Non-JSON response"
            } as ResponseDataType<any>;
        }

        if (!res.ok) {
            console.error("Error:: ", payload);
            throw new HttpError({ status: res.status, payload });
        }
        return payload.data as T;
    }

    get<T>(url: string, options?: HttpClientOptions): Promise<T> {
        return this.request<T>("GET", url, options);
    }

    post<T>(url: string, options?: HttpClientOptions): Promise<T> {
        return this.request<T>("POST", url, options);
    }

    put<T>(url: string, options?: HttpClientOptions): Promise<T> {
        return this.request<T>("PUT", url, options);
    }

    delete<T>(url: string, options?: HttpClientOptions): Promise<T> {
        return this.request<T>("DELETE", url, options);
    }

    patch<T>(url: string, options?: HttpClientOptions): Promise<T> {
        return this.request<T>("PATCH", url, options);
    }
}

export const httpClient = new Http();