import * as z from 'zod'

import config from '@/config/schema/authForm'

export const loginSchema = z.object({
    email: z.string()
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: z.string()
        .min(1, 'Password is required')
        .min(
            config.password.minLength,
            `Password must be at least ${config.password.minLength} characters`
        )
        .regex(
            config.password.format,
            config.password.formatMessage
        ),
    remember: z.boolean()
})

export type LoginSchema = z.infer<typeof loginSchema>
