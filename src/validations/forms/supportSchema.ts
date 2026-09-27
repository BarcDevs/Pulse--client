import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import {
    SUPPORT_MESSAGE_MAX_LENGTH,
    SUPPORT_TOPIC_IDS
} from '@/constants/support'

import { supportLocales } from '@/locales/supportLocales'
import { validationLocales } from '@/locales/validationLocales'

export const createSupportSchema = (
    t: TranslatorFn,
    requireEmail: boolean
) =>
    z.object({
        topic: z.enum(SUPPORT_TOPIC_IDS),
        message: z.string()
            .trim()
            .min(1, t(supportLocales.contact.errors.messageRequired))
            .max(
                SUPPORT_MESSAGE_MAX_LENGTH,
                t(supportLocales.contact.errors.messageTooLong)
            ),
        email: requireEmail
            ? z.string()
                .min(1, t(validationLocales.email.required))
                .email(t(validationLocales.email.invalid))
            : z.string().optional()
    })

export type SupportSchema =
    z.infer<ReturnType<typeof createSupportSchema>>
