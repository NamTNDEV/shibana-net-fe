'use client'

import { ROUTES } from '@/constants/routes'
import { HttpError } from '@/lib/http-errors'
import { getErrorMessage } from '@/lib/utils'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { toast } from 'sonner'

const handleGlobalError = (error: unknown) => {
    if (error instanceof HttpError) {
        if (error.payload.code === 401) {
            if (typeof window !== "undefined") {
                window.location.href = ROUTES.AUTH.LOGIN;
            }
            return
        }
        toast.error(getErrorMessage(error.payload.code), {
            position: "bottom-right",
            richColors: true,
            duration: 2000
        });
    } else {
        toast.error("Lỗi hệ thống, vui lòng thử lại sau.", {
            position: "bottom-right",
            richColors: true,
            duration: 2000
        });
    }
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient(
        {
            queryCache: new QueryCache({
                onError: (error,) => handleGlobalError(error)
            }),
            // mutationCache: new MutationCache({
            //     onError: (error) => handleGlobalError(error)
            // }),
            defaultOptions: {
                queries: {
                    staleTime: 1000 * 60 * 5, // 5 minutes
                    retry: false,
                    refetchOnWindowFocus: false,
                }
            },
        }
    ));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
