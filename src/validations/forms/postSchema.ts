import * as z from 'zod'

import config from '@/config/schema/postForm'

import categories from '@/data/forum/categories'

export const postSchema = z.object({
    category: z.string()
        .min(1, 'Category is required'),
    title: z.string()
        .min(1, 'Title is required')
        .min(config.title.minLength, 'Title is too short')
        .max(config.title.maxLength, 'Title is too long'),
    body: z.string()
        .min(1, 'Content is required')
        .min(config.body.minLength, 'Content is too short')
        .max(
            config.body.maxLength,
            `Content must be less than ${config.body.maxLength} characters`
        ),
    tags: z.array(
        z.string()
            .min(config.tags.minLength, 'Tag is too short')
            .max(config.tags.maxLength, 'Tag is too long')
            .toUpperCase()
    )
        .min(1, 'At least one tag is required')
        .max(
            config.tags.max,
            `Cannot have more than ${config.tags.max} tags`
        )
})
    .superRefine(({ category }, ctx) => {
        if (!category) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Category is required'
            })
        } else if (!categories.find(cat => cat.key === category)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Category is invalid'
            })
        }
    })

export type PostSchema = z.infer<typeof postSchema>
