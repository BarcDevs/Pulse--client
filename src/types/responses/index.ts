import {AxiosPromise} from 'axios'

export type Response<T> = {
    message: string
    data: T
}

export type ApiResponse<T> = AxiosPromise<Response<T>>
