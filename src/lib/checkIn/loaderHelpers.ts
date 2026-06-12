import { CheckIn, CheckInStats } from '@/types/checkIn'

import { toDateStr } from '@/lib/time'

export const normalizeStats =
    (raw: CheckInStats): CheckInStats => ({
        ...raw,
        totalCheckIns: raw.totalCheckIns ?? 0,
        averageMoodScore: raw.averageMoodScore ?? 0,
        averagePainLevel: raw.averagePainLevel ?? 0
    })

export const isTodayCheckIn =
    (checkIn: CheckIn): boolean =>
        checkIn.checkInDate.slice(0, 10) === toDateStr(new Date())