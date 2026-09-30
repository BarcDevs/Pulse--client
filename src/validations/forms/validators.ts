import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import { hasSimpleRun } from '@/utils/password'

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

// For signup, reset and change: stricter than passwordField, which login and
// current-password checks keep so existing users aren't locked out
export const newPasswordField = (
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
            config.password.strongFormat,
            t(validationLocales.password.strongFormat)
        )
        .refine(
            (password) => !hasSimpleRun(password),
            t(validationLocales.password.simpleRun)
        )

export const confirmPasswordField = (
    requiredMessage: string
) =>
    z.string()
        .min(1, requiredMessage)
