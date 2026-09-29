import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import { validationLocales } from '@/locales/validationLocales'

import {
    confirmPasswordField,
    newPasswordField
} from './validators'

export const createResetPasswordSchema = (t: TranslatorFn) =>
    z.object({
        password: newPasswordField(
            t,
            t(validationLocales.password.required)
        ),
        confirmPassword: confirmPasswordField(
            t(validationLocales.password.confirm.required)
        )
    }).superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t(validationLocales.password.noMatch),
                path: ['confirmPassword']
            })
        }
    })

export type ResetPasswordSchema =
    z.infer<ReturnType<typeof createResetPasswordSchema>>
