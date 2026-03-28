import {CheckIn, CheckInStats} from '@/types/checkIn/checkIn'
import {ApiResponse, Response} from '@/types/responses'

import {ENDPOINTS} from '@/constants/endpoints'

import {api} from '@/api/index'
import {CheckInSchema} from '@/validations/forms/checkInSchema'

export const fetchCheckIns = async (
    limit?: number
): ApiResponse<CheckIn[]> => {
    const params = { limit }
    return api.get<Response<CheckIn[]>>(
        ENDPOINTS.checkIn.base,
        { params }
    )
}

export const submitCheckIn = async (
    data: CheckInSchema
): ApiResponse<CheckIn> =>
    api.post<Response<CheckIn>>(
        ENDPOINTS.checkIn.base,
        { ...data }
    )

export const fetchCheckInStats = async ():
    ApiResponse<CheckInStats> =>
    api.get<Response<CheckInStats>>(
        ENDPOINTS.checkIn.stats
    )

export const createCheckIn = async (
    data: CheckInSchema
): ApiResponse<CheckIn> =>
    api.post<Response<CheckIn>>(
        ENDPOINTS.checkIn.base,
        {...data}
    )

export const patchCheckIn = async (
    id: string,
    data: Partial<CheckInSchema>
): ApiResponse<CheckIn> =>
    api.patch<Response<CheckIn>>(
        `${ENDPOINTS.checkIn.base}/${id}`,
        {...data}
    )

export const updateCheckIn = async (
    id: string,
    data: Partial<CheckInSchema>
): ApiResponse<CheckIn> =>
    api.patch<Response<CheckIn>>(
        `${ENDPOINTS.checkIn.base}/${id}`,
        {...data}
    )

export const getCheckIn = async (
    id: string
): ApiResponse<CheckIn> =>
    api.get<Response<CheckIn>>(
        `${ENDPOINTS.checkIn.base}/${id}`
    )