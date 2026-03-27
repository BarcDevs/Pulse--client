import {CheckIn, CheckInStats} from '@/types/checkIn'

import {defaults} from '@/constants/defaults'

import {fetchCheckIns, fetchCheckInStats} from '@/api/checkIn'

type CheckInLoaderData = {
    history: CheckIn[]
    stats: CheckInStats
}

export const checkInLoader = async (): Promise<CheckInLoaderData> => {
    const [historyRes, statsRes] = await Promise.all([
        fetchCheckIns(defaults.checkIn.historyLimit),
        fetchCheckInStats()
    ])

    return {
        history: historyRes.data.data,
        stats: statsRes.data.data
    }
}

export const newCheckInLoader = async (): Promise<CheckInLoaderData> => {
    const [historyRes, statsRes] = await Promise.all([
        fetchCheckIns(defaults.checkIn.historyLimit),
        fetchCheckInStats()
    ])

    return {
        history: historyRes.data.data,
        stats: statsRes.data.data
    }
}