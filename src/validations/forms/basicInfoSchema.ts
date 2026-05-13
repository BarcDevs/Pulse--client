import { z } from 'zod'

import { basicInfoFormConfig } from '@/config/schema/basicInfoForm'

export const basicInfoSchema = z.object({
    firstName: z
        .string()
        .min(1, 'First name cannot be empty')
        .max(
            basicInfoFormConfig.name.max,
            `First name must be at most ${basicInfoFormConfig.name.max} characters`
        )
        .optional(),
    lastName: z
        .string()
        .min(1, 'Last name cannot be empty')
        .max(
            basicInfoFormConfig.name.max,
            `Last name must be at most ${basicInfoFormConfig.name.max} characters`
        )
        .optional(),
    location: z
        .string()
        .max(
            basicInfoFormConfig.location.max,
            `Location must be at most ${basicInfoFormConfig.location.max} characters`
        )
        .optional()
})

export type BasicInfoSchema = z.infer<typeof basicInfoSchema>