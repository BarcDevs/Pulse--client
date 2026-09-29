import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import { validationLocales } from '@/locales/validationLocales'

import { createOtpSchema } from './otpSchema'
import {
    confirmPasswordField,
    passwordField
} from './validators'

export const createResetPasswordSchema = (t: TranslatorFn) =>
    createOtpSchema(t).extend({
        password: passwordField(
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
