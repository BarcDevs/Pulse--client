import { AxiosPromise } from 'axios'

export type Response<T> = {
    message: string
    data: T
}

export type ApiErrorDetail = {
    statusType: string
    statusCode: number
    error: string
}

/** Shape of error response bodies from the server:
 { "message": "User not found!", "error": [{ "statusType": "Authentication Error", "statusCode": 401, "error": "User not found!" }] } */
export type ApiErrorResponse = {
    message: string
    error: ApiErrorDetail[]
}

export type ApiResponse<T> = AxiosPromise<Response<T>>
