import { CheckIn } from '@/types/checkIn'

import { toDateStrInTimezone } from '@/lib/time'

export const isTodayCheckIn =
    (checkIn: CheckIn, timezone?: string): boolean =>
        checkIn.checkInDate.slice(0, 10) === toDateStrInTimezone(new Date(), timezone)