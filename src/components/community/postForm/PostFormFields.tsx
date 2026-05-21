'use client'

import { useTranslations } from 'next-intl'

import { UseFormReturn } from 'react-hook-form'

import { PostFormCategoryField } from '@/components/community/postForm/PostFormCategoryField'
import { TagInput } from '@/components/community/postForm/TagInput'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'

import config from '@/config/schema/postForm'
import { communityLocales } from '@/locales/communityLocales'
import { type PostFormSchema } from '@/validations/forms/postFormSchema'

type PostFormFieldsProps = {
    form: UseFormReturn<PostFormSchema>
}

export const PostFormFields = ({
    form
}: PostFormFieldsProps) => {
    const t = useTranslations()

    return (
        <>
            <FormField
                control={form.control}
                name={'title'}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {t(communityLocales.postForm.title)}
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder={t(communityLocales.postForm.titlePlaceholder)}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <PostFormCategoryField form={form}/>

            <FormField
                control={form.control}
                name={'tags'}
                render={({ field, fieldState }) => {
                    const count = field.value?.length ?? 0
                    const hasError = !!fieldState.error

                    return (
                        <FormItem>
                            <div className={'flex items-baseline justify-between'}>
                                <FormLabel>
                                    {t(communityLocales.postForm.tags)}
                                </FormLabel>
                                <span className={cn(
                                    'text-xs',
                                    hasError
                                        ? 'text-destructive'
                                        : 'text-muted-foreground'
                                )}>
                                    {`${count}/${config.tags.max} · ${t(communityLocales.postForm.tagsHint)}`}
                                </span>
                            </div>
                            <FormControl>
                                <TagInput
                                    value={field.value ?? []}
                                    onChangeAction={field.onChange}
                                    onBlurAction={field.onBlur}
                                    placeholder={t(communityLocales.postForm.tagsPlaceholder)}
                                    error={fieldState.error?.message}
                                />
                            </FormControl>
                        </FormItem>
                    )
                }}
            />
        </>
    )
}
