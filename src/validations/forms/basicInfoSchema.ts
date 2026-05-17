import { z } from 'zod'

import { TranslatorFn } from '@/types/i18n'

import { basicInfoFormConfig } from '@/config/schema/basicInfoForm'

import { validationLocales } from '@/locales/validationLocales'

export const createBasicInfoSchema = (t: TranslatorFn) =>
    z.object({
        firstName: z.string()
            .min(1, t(validationLocales.name.firstName.empty))
            .max(
                basicInfoFormConfig.name.max,
                t(
                    validationLocales.name.firstName.tooLong,
                    { max: basicInfoFormConfig.name.max }
                )
            )
            .optional(),
        lastName: z.string()
            .min(1, t(validationLocales.name.lastName.empty))
            .max(
                basicInfoFormConfig.name.max,
                t(
                    validationLocales.name.lastName.tooLong,
                    { max: basicInfoFormConfig.name.max }
                )
            )
            .optional(),
        location: z.string()
            .max(
                basicInfoFormConfig.location.max,
                t(
                    validationLocales.name.location.tooLong,
                    { max: basicInfoFormConfig.location.max }
                )
            )
            .optional()
    })

export type BasicInfoSchema =
    z.infer<ReturnType<typeof createBasicInfoSchema>>
