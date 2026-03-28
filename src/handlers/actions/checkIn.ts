import {CheckIn} from '@/types/checkIn/checkIn'

import {createCheckIn, patchCheckIn,submitCheckIn} from '@/api/checkIn'
import {CheckInSchema} from '@/validations/forms/checkInSchema'

export const handleCheckInSubmit = async (
    data: CheckInSchema
): Promise<CheckIn> => {
    const res = await submitCheckIn(data)
    return res.data.data
}

export const handleCheckInCreate = async (
    data: CheckInSchema
): Promise<CheckIn> => {
    const res = await createCheckIn(data)
    return res.data.data
}

export const handleCheckInUpdate = async (
    id: string,
    data: Partial<CheckInSchema>
): Promise<CheckIn> => {
    const res = await patchCheckIn(id, data)
    return res.data.data
}

export const handleCheckInSave = async (
    data: CheckInSchema,
    existingCheckIn?: CheckIn
): Promise<{checkIn: CheckIn; created: boolean}> => {
    if (existingCheckIn) {
        const checkIn = await handleCheckInUpdate(existingCheckIn.id, data)
        return {checkIn, created: false}
    }

    const checkIn = await handleCheckInCreate(data)
    return {checkIn, created: true}
}