import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import config from '@/config/schema/authForm'

import { validationLocales } from '@/locales/validationLocales'

export const createOtpSchema = (
    t: TranslatorFn
) =>
    z.object({
        otp: z.string()
            .min(
                1,
                t(validationLocales.otp.required)
            )
            .min(
                config.otp.length,
                t(validationLocales.otp.tooShort)
            )
            .max(
                config.otp.length,
                t(validationLocales.otp.invalid)
            )
            .regex(
                config.otp.pattern,
                t(validationLocales.otp.invalid)
            )
    })

export type OtpSchema =
    z.infer<ReturnType<typeof createOtpSchema>>
