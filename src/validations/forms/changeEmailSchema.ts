import * as z from 'zod'

import config from '@/config/schema/authForm'

export const changeEmailSchema = z.object({
    newEmail: z.string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z.string()
        .min(1, 'Password is required')
        .min(
            config.password.minLength,
            `Password must be at least ${config.password.minLength} characters`
        )
        .regex(
            config.password.format,
            config.password.formatMessage
        )
})

export type ChangeEmailSchema =
    z.infer<typeof changeEmailSchema>
