import * as z from 'zod'

import {
    confirmPasswordField,
    passwordField
} from './validators'

export const changePasswordSchema = z.object({
    currentPassword: passwordField('Current password is required'),
    newPassword: passwordField('New password is required'),
    confirmPassword: confirmPasswordField('Please confirm your password')
}).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    }
)

export type ChangePasswordSchema =
    z.infer<typeof changePasswordSchema>
