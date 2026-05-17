import * as z from 'zod'

import {
    confirmPasswordField,
    passwordField
} from './validators'

export const signupSchema = z.object({
    firstName: z.string()
        .min(2, 'First name is required'),
    lastName: z.string()
        .min(2, 'Last name is required'),
    email: z.string()
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: passwordField('Password is required'),
    confirmPassword: confirmPasswordField('Confirm password is required')
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
