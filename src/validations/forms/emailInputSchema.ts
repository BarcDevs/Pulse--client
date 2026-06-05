import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import { validationLocales } from '@/locales/validationLocales'

export const createEmailInputSchema = (
    t: TranslatorFn
) =>
    z.object({
        email: z.string()
            .min(
                1,
                t(validationLocales.email.required)
            )
            .email(
                t(validationLocales.email.invalid)
            )
    })

export type EmailInputSchema =
    z.infer<
        ReturnType<typeof createEmailInputSchema>
    >
