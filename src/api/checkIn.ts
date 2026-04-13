import { format } from 'date-fns'

import {
    CheckIn,
    CheckInStats
} from '@/types/checkIn'
import { ApiResponse, Response } from '@/types/responses'
import { TimePeriod } from '@/types/time'

import { ENDPOINTS } from '@/constants/endpoints'

import { api } from '@/api/index'
import { CheckInSchema } from '@/validations/forms/checkInSchema'

export const fetchCheckIns = async (
    limit?: number
): ApiResponse<CheckIn[]> => {
    const params = { limit }
    return api.get<Response<CheckIn[]>>(
        ENDPOINTS.checkIn.base,
        { params }
    )
}

export const fetchCheckInHistory = async (
    days?: number
) => {
    const params = days ? { limit: days } : {}
    const response = await api.get<Response<CheckIn[]>>(
        ENDPOINTS.checkIn.base,
        { params }
    )

    const transformed = response.data.data.map(
        (checkIn) => {
            const dateObj = new Date(checkIn.checkInDate)
            return {
                date: format(dateObj, 'd MMM'),
                originalDate: checkIn.checkInDate,
                mood: checkIn.moodScore,
                pain: checkIn.painLevel,
                energy: checkIn.energy
            }
        }
    )

    return {
        ...response,
        data: {
            ...response.data,
            data: transformed
        }
    }
}

export const submitCheckIn = async (
    data: CheckInSchema
): ApiResponse<CheckIn> =>
    api.post<Response<CheckIn>>(
        ENDPOINTS.checkIn.base,
        { ...data }
    )

export const fetchCheckInStats = async (
    period?: TimePeriod
): ApiResponse<CheckInStats> => {
    const params = period ? { period } : {}
    return api.get<Response<CheckInStats>>(
        ENDPOINTS.checkIn.stats,
        { params }
    )
}

export const createCheckIn = async (
    data: CheckInSchema
): ApiResponse<CheckIn> =>
    api.post<Response<CheckIn>>(
        ENDPOINTS.checkIn.base,
        { ...data }
    )

export const patchCheckIn = async (
    id: string,
    data: Partial<CheckInSchema>
): ApiResponse<CheckIn> =>
    api.patch<Response<CheckIn>>(
        `${ENDPOINTS.checkIn.base}/${id}`,
        { ...data }
    )

export const updateCheckIn = async (
    id: string,
    data: Partial<CheckInSchema>
): ApiResponse<CheckIn> =>
    api.patch<Response<CheckIn>>(
        `${ENDPOINTS.checkIn.base}/${id}`,
        { ...data }
    )

export const getCheckIn = async (
    id: string
): ApiResponse<CheckIn> =>
    api.get<Response<CheckIn>>(
        `${ENDPOINTS.checkIn.base}/${id}`
    )