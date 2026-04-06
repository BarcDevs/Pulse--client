import * as z from 'zod'

import config from '@/config/schema/authForm'

export const signupSchema = z.object({
    firstName: z.string()
        .min(2, 'First name is required'),
    lastName: z.string()
        .min(2, 'Last name is required'),
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
    confirmPassword: z.string()
        .min(1, 'Confirm password is required')
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match',
            path: ['confirmPassword']
        })
    }
})

export type SignupSchema = z.infer<typeof signupSchema>
