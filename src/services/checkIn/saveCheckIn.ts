import {CheckIn} from '@/types/checkIn'

import {isTodayCheckIn} from '@/lib/checkIn/loaderHelpers'

import {
    createCheckIn,
    patchCheckIn
} from '@/api/checkIn'
import {CheckInSchema} from '@/validations/forms/checkInSchema'

export type CheckInSaveResult = {
    checkIn: CheckIn
    created: boolean
}

export const saveCheckIn = async (
    data: CheckInSchema,
    latestCheckIn: CheckIn | null | undefined
): Promise<CheckInSaveResult> => {
    const checkInExists = latestCheckIn &&
        isTodayCheckIn(latestCheckIn)

    if (checkInExists) {
        const res = await patchCheckIn(latestCheckIn.id, data)
        return {
            checkIn: res.data.data,
            created: false
        }
    }

    try {
        const res = await createCheckIn(data)
        return {
            checkIn: res.data.data,
            created: true
        }
    } catch (err) {
        const status = (err as any).response?.status
        if (status === 409) {
            const res = await patchCheckIn(latestCheckIn!.id, data)
            return {
                checkIn: res.data.data,
                created: false
            }
        }
        throw err
    }
}