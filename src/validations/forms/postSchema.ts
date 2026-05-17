import * as z from 'zod'

import { TranslatorFn } from '@/types/i18n'

import config from '@/config/schema/postForm'

import categories from '@/data/forum/categories'
import { validationLocales } from '@/locales/validationLocales'

export const createPostSchema = (t: TranslatorFn) =>
    z.object({
        category: z.string()
            .min(1, t(validationLocales.post.category.required)),
        title: z.string()
            .min(1, t(validationLocales.post.title.required))
            .min(
                config.title.minLength,
                t(validationLocales.post.title.tooShort)
            )
            .max(
                config.title.maxLength,
                t(validationLocales.post.title.tooLong)
            ),
        body: z.string()
            .min(1, t(validationLocales.post.content.required))
            .min(
                config.body.minLength,
                t(validationLocales.post.content.tooShort)
            )
            .max(
                config.body.maxLength,
                t(
                    validationLocales.post.content.tooLong,
                    { max: config.body.maxLength }
                )
            ),
        tags: z.array(
            z.string()
                .min(
                    config.tags.minLength,
                    t(validationLocales.post.tag.tooShort)
                )
                .max(
                    config.tags.maxLength,
                    t(validationLocales.post.tag.tooLong)
                )
                .toUpperCase()
        )
            .min(1, t(validationLocales.post.tag.required))
            .max(
                config.tags.max,
                t(
                    validationLocales.post.tag.tooMany,
                    { max: config.tags.max }
                )
            )
    })
        .superRefine(({ category }, ctx) => {
            if (!category) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t(validationLocales.post.category.required)
                })
            } else if (!categories.find(cat => cat.key === category)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t(validationLocales.post.category.invalid)
                })
            }
        })

export type PostSchema =
    z.infer<ReturnType<typeof createPostSchema>>
