import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import { validationLocales } from '@/locales/validationLocales'

import { passwordField } from './validators'

export const createChangeEmailSchema = (t: TranslatorFn) =>
    z.object({
        newEmail: z.string()
            .min(1, t(validationLocales.email.required))
            .email(t(validationLocales.email.invalid)),
        password: passwordField(
            t, t(validationLocales.password.required)
        )
    })

export type ChangeEmailSchema =
    z.infer<ReturnType<typeof createChangeEmailSchema>>