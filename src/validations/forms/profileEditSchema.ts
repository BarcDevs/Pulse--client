import { z } from 'zod'

import { TranslatorFn } from '@/types/i18n'

import { basicInfoFormConfig } from '@/config/schema/basicInfoForm'
import profileFormConfig from '@/config/schema/profileForm'

import { validationLocales } from '@/locales/validationLocales'

export const createProfileEditSchema = (t: TranslatorFn) =>
    z.object({
        username: z.string()
            .min(1, t(validationLocales.name.username.empty))
            .min(
                basicInfoFormConfig.username.min,
                t(validationLocales.name.username.tooShort, { min: basicInfoFormConfig.username.min })
            )
            .max(
                basicInfoFormConfig.username.max,
                t(validationLocales.name.username.tooLong, { max: basicInfoFormConfig.username.max })
            )
            .regex(
                basicInfoFormConfig.username.pattern,
                t(validationLocales.name.username.invalid)
            )
            .optional(),
        firstName: z.string()
            .min(1, t(validationLocales.name.firstName.empty))
            .max(
                basicInfoFormConfig.name.max,
                t(validationLocales.name.firstName.tooLong, { max: basicInfoFormConfig.name.max })
            )
            .optional(),
        lastName: z.string()
            .min(1, t(validationLocales.name.lastName.empty))
            .max(
                basicInfoFormConfig.name.max,
                t(validationLocales.name.lastName.tooLong, { max: basicInfoFormConfig.name.max })
            )
            .optional(),
        location: z.string()
            .max(
                basicInfoFormConfig.location.max,
                t(validationLocales.name.location.tooLong, { max: basicInfoFormConfig.location.max })
            )
            .optional(),
        bio: z.string()
            .max(
                profileFormConfig.bio.maxLength,
                t(validationLocales.profile.bio.tooLong, { max: profileFormConfig.bio.maxLength })
            )
            .optional()
    })

export type ProfileEditSchema =
    z.infer<ReturnType<typeof createProfileEditSchema>>
