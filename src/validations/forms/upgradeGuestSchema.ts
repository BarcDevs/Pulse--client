import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import { validationLocales } from '@/locales/validationLocales'

import { newPasswordField } from './validators'

export const createUpgradeGuestSchema = (t: TranslatorFn) =>
    z.object({
        email: z.string()
            .min(1, t(validationLocales.email.required))
            .email(t(validationLocales.email.invalid)),
        password: newPasswordField(
            t,
            t(validationLocales.password.required)
        )
    })

export type UpgradeGuestSchema =
    z.infer<ReturnType<typeof createUpgradeGuestSchema>>
