import * as z from 'zod'

import {checkInFormSchema} from '@/config/schema/checkInForm'

export const checkInSchema = z.object({
    moodScore: z.number()
        .min(checkInFormSchema.moodScore.min)
        .max(checkInFormSchema.moodScore.max),
    painLevel: z.number()
        .min(checkInFormSchema.painLevel.min)
        .max(checkInFormSchema.painLevel.max),
    activities: z.array(
        z.string()
            .min(
                checkInFormSchema.activities.minLength,
                'Activity cannot be empty'
            )
            .max(
                checkInFormSchema.activities.maxLength,
                `Activity must be under ${checkInFormSchema.activities.maxLength} characters`
            )
    ).min(
        checkInFormSchema.activities.minCount,
        'At least one activity is required'
    ),
    notes: z.string()
        .max(
            checkInFormSchema.notes.maxLength,
            `Notes must be under ${checkInFormSchema.notes.maxLength} characters`
        )
        .optional()
})

export type CheckInSchema = z.infer<typeof checkInSchema>