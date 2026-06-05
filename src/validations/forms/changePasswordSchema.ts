import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import { validationLocales } from '@/locales/validationLocales'

import {
    confirmPasswordField,
    passwordField
} from './validators'

export const createChangePasswordSchema = (
    t: TranslatorFn
) =>
    z.object({
        currentPassword: passwordField(
            t, t(validationLocales.password.current.required)
        ),
        newPassword: passwordField(
            t, t(validationLocales.password.new.required)
        ),
        confirmPassword: confirmPasswordField(
            t(validationLocales.password.confirm.please)
        )
    }).refine(
        (data) => data.newPassword === data.confirmPassword,
        {
            message: t(validationLocales.password.noMatch),
            path: ['confirmPassword']
        }
    )

export type ChangePasswordSchema =
    z.infer<ReturnType<typeof createChangePasswordSchema>>