import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import { validationLocales } from '@/locales/validationLocales'

import { passwordField } from './validators'

export const createLoginSchema = (t: TranslatorFn) =>
    z.object({
        email: z.string()
            .min(1, t(validationLocales.email.required))
            .email(t(validationLocales.email.invalid)),
        password: passwordField(
            t,
            t(validationLocales.password.required)
        ),
        remember: z.boolean()
    })

export type LoginSchema =
    z.infer<ReturnType<typeof createLoginSchema>>