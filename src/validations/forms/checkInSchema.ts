import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import { checkInFormSchema } from '@/config/schema/checkInForm'

import { validationLocales } from '@/locales/validationLocales'

export const createCheckInSchema = (t: TranslatorFn) =>
    z.object({
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
                    t(validationLocales.checkIn.activity.empty)
                )
                .max(
                    checkInFormSchema.activities.maxLength,
                    t(
                        validationLocales.checkIn.activity.tooLong,
                        { max: checkInFormSchema.activities.maxLength }
                    )
                )
        ).min(
            checkInFormSchema.activities.minCount,
            t(validationLocales.checkIn.activity.required)
        ),
        notes: z.string()
            .max(
                checkInFormSchema.notes.maxLength,
                t(
                    validationLocales.checkIn.notes.tooLong,
                    { max: checkInFormSchema.notes.maxLength }
                )
            )
            .optional()
    })

export type CheckInSchema =
    z.infer<ReturnType<typeof createCheckInSchema>>
