import * as z from 'zod'

import { passwordField } from './validators'

export const loginSchema = z.object({
    email: z.string()
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: passwordField('Password is required'),
    remember: z.boolean()
})

export type LoginSchema = z.infer<typeof loginSchema>
