import { format } from 'date-fns'

import type {
    CheckIn,
    CheckInStats,
    MoodPainSeriesPoint
} from '@/types/checkIn'
import type { Response } from '@/types/responses'
import type { TimePeriod } from '@/types/time'

import { api } from '@/api/index'
import { ENDPOINTS } from '@/api/routes'
import { CheckInSchema } from '@/validations/forms/checkInSchema'

export const fetchCheckIns = async (
    limit?: number
): Promise<CheckIn[]> => {
    const params = { limit }
    const res = await api.get<Response<CheckIn[]>>(
        ENDPOINTS.checkIn.base,
        { params }
    )
    return res.data.data
}

export const fetchCheckInHistory = async (
    days?: number
): Promise<MoodPainSeriesPoint[]> => {
    const params = days ? { limit: days } : {}
    const res = await api.get<Response<CheckIn[]>>(
        ENDPOINTS.checkIn.base,
        { params }
    )
    return res.data.data.map(
        (checkIn) => {
            const dateObj =
                new Date(checkIn.checkInDate)
            return {
                date: format(
                    dateObj,
                    'd MMM'
                ),
                originalDate:
                    checkIn.checkInDate,
                mood: checkIn.moodScore,
                pain: checkIn.painLevel
            }
        }
    )
}

export const submitCheckIn = async (
    data: CheckInSchema
): Promise<CheckIn> => {
    const res = await api.post<Response<CheckIn>>(
        ENDPOINTS.checkIn.base,
        { ...data }
    )
    return res.data.data
}

export const fetchCheckInStats = async (
    period?: TimePeriod
): Promise<CheckInStats> => {
    const params = period ? { period } : {}
    const res = await api.get<Response<CheckInStats>>(
        ENDPOINTS.checkIn.stats,
        { params }
    )
    return res.data.data
}

export const createCheckIn = async (
    data: CheckInSchema
): Promise<CheckIn> => {
    const res = await api.post<Response<CheckIn>>(
        ENDPOINTS.checkIn.base,
        { ...data }
    )
    return res.data.data
}

export const patchCheckIn = async (
    id: string,
    data: Partial<CheckInSchema>
): Promise<CheckIn> => {
    const res = await api.patch<Response<CheckIn>>(
        `${ENDPOINTS.checkIn.base}/${id}`,
        { ...data }
    )
    return res.data.data
}

export const updateCheckIn = async (
    id: string,
    data: Partial<CheckInSchema>
): Promise<CheckIn> => {
    const res = await api.patch<Response<CheckIn>>(
        `${ENDPOINTS.checkIn.base}/${id}`,
        { ...data }
    )
    return res.data.data
}

export const getCheckIn = async (
    id: string
): Promise<CheckIn> => {
    const res = await api.get<{
        data: CheckIn
    }>(
        `${ENDPOINTS.checkIn.base}/${id}`
    )
    return res.data.data
}