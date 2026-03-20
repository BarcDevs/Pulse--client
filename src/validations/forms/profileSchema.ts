import {z} from 'zod'

import config from '@/config/schema/profileForm'

export const profileUpdateSchema = z.object({
    bio: z
        .string()
        .max(
            config.bio.maxLength,
            `Bio must be at most ${config.bio.maxLength} characters`
        )
        .optional(),
    location: z
        .string()
        .max(
            config.location.maxLength,
            `Location must be at most ${config.location.maxLength} characters`
        )
        .optional(),
    timezone: z
        .string()
        .optional()
})

export type ProfileUpdateSchema = z.infer<
    typeof profileUpdateSchema
>