import * as z from 'zod'

import { GoalCategory } from '@/types/goals'
import { TranslatorFn } from '@/types/i18n'

import { goalFormSchema } from '@/config/schema/goalForm'
import { milestoneFormSchema } from '@/config/schema/milestoneForm'

import { validationLocales } from '@/locales/validationLocales'

export const createGoalSchema = (t: TranslatorFn) =>
    z.object({
        title: z.string()
            .min(
                goalFormSchema.title.minLength,
                t(validationLocales.goal.title.required)
            )
            .max(
                goalFormSchema.title.maxLength,
                t(
                    validationLocales.goal.title.tooLong,
                    { max: goalFormSchema.title.maxLength }
                )
            ),
        description: z.string()
            .max(
                goalFormSchema.description.maxLength,
                t(
                    validationLocales.goal.description.tooLong,
                    { max: goalFormSchema.description.maxLength }
                )
            )
            .optional(),
        category: z.nativeEnum(GoalCategory),
        targetDate: z.string()
            .optional()
            .refine(
                (date) => {
                    if (!date) return true
                    const [y, m, d] = date.split('-').map(Number)
                    const picked = new Date(y, m - 1, d)
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    return picked >= today
                },
                t(validationLocales.goal.targetDate.future)
            )
    })

export const createMilestoneSchema = (t: TranslatorFn) =>
    z.object({
        title: z.string()
            .min(
                milestoneFormSchema.title.minLength,
                t(validationLocales.milestone.title.required)
            )
            .max(
                milestoneFormSchema.title.maxLength,
                t(
                    validationLocales.milestone.title.tooLong,
                    { max: milestoneFormSchema.title.maxLength }
                )
            ),
        description: z.string()
            .max(
                milestoneFormSchema.description.maxLength,
                t(
                    validationLocales.milestone.description.tooLong,
                    { max: milestoneFormSchema.description.maxLength }
                )
            )
            .optional()
    })

export type GoalSchema =
    z.infer<ReturnType<typeof createGoalSchema>>
export type MilestoneSchema =
    z.infer<ReturnType<typeof createMilestoneSchema>>
