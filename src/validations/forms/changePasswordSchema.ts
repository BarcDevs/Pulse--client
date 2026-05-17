import * as z from 'zod'

import config from '@/config/schema/authForm'

export const changePasswordSchema = z.object({
    currentPassword: z.string()
        .min(1, 'Current password is required')
        .min(
            config.password.minLength,
            `Password must be at least ${config.password.minLength} characters`
        )
        .regex(
            config.password.format,
            config.password.formatMessage
        ),
    newPassword: z.string()
        .min(1, 'New password is required')
        .min(
            config.password.minLength,
            `Password must be at least ${config.password.minLength} characters`
        )
        .regex(
            config.password.format,
            config.password.formatMessage
        ),
    confirmPassword: z.string()
        .min(1, 'Please confirm your password')
}).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    }
)

export type ChangePasswordSchema =
    z.infer<typeof changePasswordSchema>
