import * as z from 'zod'

import config from '@/config/schema/authForm'

export const passwordField = (requiredMessage: string) =>
    z.string()
        .min(1, requiredMessage)
        .min(
            config.password.minLength,
            `Password must be at least ${config.password.minLength} characters`
        )
        .regex(
            config.password.format,
            config.password.formatMessage
        )

export const confirmPasswordField = (
    requiredMessage: string
) =>
    z.string()
        .min(1, requiredMessage)
