export type ResponseDataType<T> = {
    data: T
    message: string
    code: number
}

export type ActionResponseDataType<T> = {
    success: boolean
    message: string
    code?: number
    data?: T
}

export type PaginationResponseDataType<T> = {
    hasNext: boolean
    page: number
    payload: T
    size: number
    totalElements: number
}

export type CursorPaginationResponseDataType<T> = {
    hasNext: boolean
    nextCursor: string | null
    payload: T
    size: number
}