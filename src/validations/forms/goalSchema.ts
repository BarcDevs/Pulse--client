import * as z from 'zod'

import { GoalCategory } from '@/types/goals'

import { goalFormSchema } from '@/config/schema/goalForm'

export const goalSchema = z.object({
    title: z
        .string()
        .min(
            goalFormSchema.title.minLength,
            'Goal title is required'
        )
        .max(
            goalFormSchema.title.maxLength,
            `Goal title must be ${goalFormSchema.title.maxLength} characters or less`
        ),
    description: z
        .string()
        .max(
            goalFormSchema.description.maxLength,
            `Description must be ${goalFormSchema.description.maxLength} characters or less`
        )
        .optional(),
    category: z.nativeEnum(GoalCategory),
    targetDate: z
        .string()
        .optional()
        .refine(
            (date) => {
                if (!date) return true
                return new Date(date) >= new Date(
                    new Date().toDateString()
                )
            },
            'Target date must be in the future'
        )
})

export type GoalSchema = z.infer<typeof goalSchema>
