import * as z from 'zod'

import config from '@/config/schema/checkInForm'

export const checkInSchema = z.object({
    moodScore: z.number()
        .min(config.moodScore.min)
        .max(config.moodScore.max),
    painLevel: z.number()
        .min(config.painLevel.min)
        .max(config.painLevel.max),
    activities: z.array(
        z.string()
            .min(
                config.activities.minLength,
                'Activity cannot be empty'
            )
            .max(
                config.activities.maxLength,
                `Activity must be under ${config.activities.maxLength} characters`
            )
    ).min(
        config.activities.minCount,
        'At least one activity is required'
    ),
    notes: z.string()
        .max(
            config.notes.maxLength,
            `Notes must be under ${config.notes.maxLength} characters`
        )
        .optional()
})

export type CheckInSchema = z.infer<typeof checkInSchema>