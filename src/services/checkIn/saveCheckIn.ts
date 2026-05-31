import { CheckIn } from '@/types/checkIn'

import { isTodayCheckIn } from '@/lib/checkIn/loaderHelpers'

import {
    createCheckIn,
    patchCheckIn
} from '@/api/checkIn'
import { CheckInSchema } from '@/validations/forms/checkInSchema'

export type CheckInSaveResult = {
    checkIn: CheckIn
    created: boolean
}

export const saveCheckIn = async (
    data: CheckInSchema,
    latestCheckIn?: CheckIn
): Promise<CheckInSaveResult> => {
    const checkInExists = latestCheckIn
        && isTodayCheckIn(latestCheckIn)

    if (checkInExists) {
        const checkIn = await patchCheckIn(latestCheckIn.id, data)
        return {
            checkIn,
            created: false
        }
    }

    try {
        const checkIn = await createCheckIn(data)
        return {
            checkIn,
            created: true
        }
    } catch (err) {
        const status = (err as any).response?.status
        if (status === 409) {
            const checkIn = await patchCheckIn(latestCheckIn!.id, data)
            return {
                checkIn,
                created: false
            }
        }
        throw err
    }
}