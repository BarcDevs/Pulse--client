import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import config from '@/config/schema/postForm'

import categories from '@/data/forum/categories'
import { validationLocales } from '@/locales/validationLocales'

const stripHtmlTags = (html: string) =>
    html.replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim()

type PostFormSchemaOptions = {
    isReply?: boolean
}

const tagItemSchema = (t: TranslatorFn) => z.string()
    .min(config.tags.minLength, t(validationLocales.post.tag.tooShort, { min: config.tags.minLength }))
    .max(config.tags.maxLength, t(validationLocales.post.tag.tooLong, { max: config.tags.maxLength }))

export const createPostFormSchema = (
    t: TranslatorFn,
    { isReply = false }: PostFormSchemaOptions = {}
) =>
    z.object({
        title: isReply
            ? z.string().optional()
            : z.string()
                .trim()
                .min(1, t(validationLocales.post.title.required))
                .min(
                    config.title.minLength,
                    t(validationLocales.post.title.tooShort)
                )
                .max(
                    config.title.maxLength,
                    t(validationLocales.post.title.tooLong)
                ),
        category: isReply
            ? z.string()
                .optional()
            : z.string()
                .min(1, t(validationLocales.post.category.required)),
        body: z.string()
            .superRefine((value, ctx) => {
            const stripped = stripHtmlTags(value)

            if (stripped.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t(validationLocales.post.content.required)
                })
                return z.NEVER
            }

            if (stripped.length < config.body.minLength) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t(
                        validationLocales.post.content.tooShortMin,
                        { min: config.body.minLength }
                    )
                })
            }

            if (stripped.length > config.body.maxLength) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t(
                        validationLocales.post.content.tooLong,
                        { max: config.body.maxLength }
                    )
                })
            }
        }),
        tags: isReply
            ? z.array(tagItemSchema(t)).optional()
            : z.array(tagItemSchema(t))
                .min(
                    config.tags.min,
                    t(validationLocales.post.tag.required)
                )
                .max(
                    config.tags.max,
                    t(
                        validationLocales.post.tag.tooMany,
                        { max: config.tags.max }
                    )
                )
    })
        .superRefine((data, ctx) => {
            if (isReply) return

            if (
                data.category
                && !categories.find(cat =>
                    cat.key === data.category)
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['category'],
                    message: t(validationLocales.post.category.invalid)
                })
            }
        })

export type PostFormSchema =
    z.infer<
        ReturnType<typeof createPostFormSchema>
    >
