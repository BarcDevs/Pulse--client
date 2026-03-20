import {format} from 'date-fns'

import {CheckIn, CheckInStats} from '@/types/checkIn.ts'

export const normalizeStats =
    (raw: CheckInStats): CheckInStats => ({
        ...raw,
        totalCheckIns: raw.totalCheckIns ?? 0,
        averageMoodScore: raw.averageMoodScore ?? 0,
        averagePainLevel: raw.averagePainLevel ?? 0
    })

export const isTodayCheckIn =
    (checkIn: CheckIn): boolean => {
        const today = format(
            new Date(),
            'yyyy-MM-dd'
        )

        const checkInDay = format(
            new Date(checkIn.checkInDate),
            'yyyy-MM-dd'
        )

        return checkInDay === today
    }