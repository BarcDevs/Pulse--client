import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import config from '@/config/schema/authForm'

import { validationLocales } from '@/locales/validationLocales'

export const passwordField = (
    t: TranslatorFn,
    requiredMessage: string
) =>
    z.string()
        .min(1, requiredMessage)
        .min(
            config.password.minLength,
            t(
                validationLocales.password.tooShort,
                { min: config.password.minLength }
            )
        )
        .regex(
            config.password.format,
            t(validationLocales.password.format)
        )

export const confirmPasswordField = (
    requiredMessage: string
) =>
    z.string()
        .min(1, requiredMessage)
