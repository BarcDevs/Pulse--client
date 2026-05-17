import * as z from 'zod'

import { passwordField } from './validators'

export const changeEmailSchema = z.object({
    newEmail: z.string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: passwordField('Password is required')
})

export type ChangeEmailSchema =
    z.infer<typeof changeEmailSchema>
