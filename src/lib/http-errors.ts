export type HttpErrorPayload = {
    code: number
    message: string
    data?: Record<string, any>
}

export class HttpError extends Error {
    readonly status: number
    readonly payload: HttpErrorPayload

    constructor({ status, payload }: { status: number, payload: HttpErrorPayload }) {
        super(payload.message)
        this.status = status
        this.payload = payload
    }
}
