'use client'

import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

import { UseFormReturn } from 'react-hook-form'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'

import { useDirection } from '@/hooks/useDirection'

import { reactQuillSetup } from '@/constants/config/reactQuillSetup'

import { communityLocales } from '@/locales/communityLocales'

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill-new')
        return RQ
    },
    {
        ssr: false,
        loading: () => <div className={'bg-container min-h-32 animate-pulse'}/>
    }
)

type PostFormBodyProps = {
    form: UseFormReturn<any>
    isReply: boolean
}

export const PostFormBody = ({
    form,
    isReply
}: PostFormBodyProps) => {
    const t = useTranslations()
    const dir = useDirection()

    return (
        <FormField
            control={form.control}
            name={'body'}
            render={({ field }) => (
                <FormItem>
                    {!isReply && (
                        <FormLabel>
                            {t(communityLocales.postForm.content)}
                        </FormLabel>
                    )}
                    <FormControl>
                        <div
                            dir={dir}
                            className={'border border-input rounded-md bg-white'}
                        >
                            <ReactQuill
                                theme={'snow'}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                modules={reactQuillSetup.modules}
                                formats={reactQuillSetup.formats}
                                placeholder={isReply
                                    ? t(communityLocales.postForm.bodyPlaceholderReply)
                                    : t(communityLocales.postForm.bodyPlaceholderPost)}
                                className={'text-sm'}
                            />
                        </div>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}
