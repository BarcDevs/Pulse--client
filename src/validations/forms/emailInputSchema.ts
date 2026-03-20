import * as z from 'zod'

export const emailInputSchema = z.object({
    email: z.string()
        .min(1, 'Email is required')
        .email('Invalid email')
})

export type EmailInputSchema = z.infer<typeof emailInputSchema>
