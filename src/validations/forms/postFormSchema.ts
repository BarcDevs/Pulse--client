import * as z from 'zod'

import config from '@/config/schema/postForm'

import categories from '@/data/forum/categories'

const stripHtmlTags = (
    html: string
) => html.replace(/<[^>]*>/g, '')

const minContentLength = (
    minLength: number
) => (value: string) => {
    const plainText = stripHtmlTags(value)
    return plainText.length >= minLength
}

const maxContentLength = (
    maxLength: number
) => (value: string) => {
    const plainText = stripHtmlTags(value)
    return plainText.length <= maxLength
}

export const postFormSchema = z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    body: z.string()
        .min(1, 'Content is required')
        .refine(
            minContentLength(config.body.minLength),
            `Content is too short (minimum ${config.body.minLength} characters)`
        )
        .refine(
            maxContentLength(config.body.maxLength),
            `Content must be less than ${config.body.maxLength} characters`
        ),
    tags: z.array(
        z.string()
            .min(config.tags.minLength, 'Tag is too short')
            .max(config.tags.maxLength, 'Tag is too long')
            .toUpperCase()
    ).optional()
})
    .superRefine((data, ctx) => {
        const isNewPost = data.title && data.category

        if (isNewPost) {
            if (
                !categories.find(
                    cat => cat.key === data.category
                )
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['category'],
                    message: 'Category is invalid'
                })
            }

            if (
                !data.tags || data.tags.length === 0
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['tags'],
                    message: 'At least one tag is required'
                })
            } else if (
                data.tags.length > config.tags.max
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['tags'],
                    message: `Cannot have more than ${config.tags.max} tags`
                })
            }
        }
    })

export type PostFormSchema = z.infer<typeof postFormSchema>
