import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import { validationLocales } from '@/locales/validationLocales'

import {
    confirmPasswordField,
    passwordField
} from './validators'

export const createSignupSchema = (t: TranslatorFn) =>
    z.object({
        firstName: z.string()
            .min(2, t(validationLocales.name.firstName.required)),
        lastName: z.string()
            .min(2, t(validationLocales.name.lastName.required)),
        email: z.string()
            .min(1, t(validationLocales.email.required))
            .email(t(validationLocales.email.invalid)),
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

export type SignupSchema =
    z.infer<ReturnType<typeof createSignupSchema>>
