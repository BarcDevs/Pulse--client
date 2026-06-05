import { z } from 'zod'

import { TranslatorFn } from '@/types/i18n'

import config from '@/config/schema/profileForm'

import { validationLocales } from '@/locales/validationLocales'

export const createProfileUpdateSchema = (t: TranslatorFn) =>
    z.object({
        bio: z.string()
            .max(
                config.bio.maxLength,
                t(
                    validationLocales.profile.bio.tooLong,
                    { max: config.bio.maxLength }
                )
            )
            .optional(),
        location: z.string()
            .max(
                config.location.maxLength,
                t(
                    validationLocales.name.location.tooLong,
                    { max: config.location.maxLength }
                )
            )
            .optional(),
        timezone: z.string().optional()
    })

export type ProfileUpdateSchema =
    z.infer<ReturnType<typeof createProfileUpdateSchema>>
