import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import config from '@/config/schema/postForm'

import categories from '@/data/forum/categories'
import { validationLocales } from '@/locales/validationLocales'

const stripHtmlTags = (
    html: string
) => html.replace(/<[^>]*>/g, '')

const minContentLength = (
    minLength: number
) => (value: string) =>
    stripHtmlTags(value).length >= minLength

const maxContentLength = (
    maxLength: number
) => (value: string) =>
    stripHtmlTags(value).length <= maxLength

export const createPostFormSchema = (t: TranslatorFn) =>
    z.object({
        title: z.string().optional(),
        category: z.string().optional(),
        body: z.string()
            .min(1, t(validationLocales.post.content.required))
            .refine(
                minContentLength(config.body.minLength),
                t(
                    validationLocales.post.content.tooShortMin,
                    { min: config.body.minLength }
                )
            )
            .refine(
                maxContentLength(config.body.maxLength),
                t(
                    validationLocales.post.content.tooLong,
                    { max: config.body.maxLength }
                )
            ),
        tags: z.array(
            z.string()
                .min(config.tags.minLength, t(validationLocales.post.tag.tooShort))
                .max(config.tags.maxLength, t(validationLocales.post.tag.tooLong))
                .toUpperCase()
        ).optional()
    })
        .superRefine((data, ctx) => {
            const isNewPost =
                data.title && data.category

            if (isNewPost) {
                if (
                    !categories.find(
                        cat =>
                            cat.key === data.category
                    )
                ) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['category'],
                        message: t(validationLocales.post.category.invalid)
                    })
                }

                if (
                    !data.tags
                    || data.tags.length === 0
                ) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['tags'],
                        message: t(validationLocales.post.tag.required)
                    })
                } else if (
                    data.tags.length > config.tags.max
                ) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['tags'],
                        message: t(
                            validationLocales.post.tag.tooMany,
                            { max: config.tags.max }
                        )
                    })
                }
            }
        })

export type PostFormSchema =
    z.infer<
        ReturnType<typeof createPostFormSchema>
    >
