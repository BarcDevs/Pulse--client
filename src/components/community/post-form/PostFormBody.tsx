'use client'

import dynamic from 'next/dynamic'

import { UseFormReturn } from 'react-hook-form'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'

import { communityPageTexts } from '@/constants/componentTexts/community'
import { reactQuillSetup } from '@/constants/config/reactQuillSetup'

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
}: PostFormBodyProps) => (
    <FormField
        control={form.control}
        name={'body'}
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    {isReply
                        ? communityPageTexts.postForm.writeReply
                        : communityPageTexts.postForm.content}
                </FormLabel>
                <FormControl>
                    <div className={'border border-input rounded-md bg-white'}>
                        <ReactQuill
                            theme={'snow'}
                            value={field.value}
                            onChange={field.onChange}
                            modules={reactQuillSetup.modules}
                            formats={reactQuillSetup.formats}
                            placeholder={isReply
                                ? communityPageTexts.postForm.bodyPlaceholderReply
                                : communityPageTexts.postForm.bodyPlaceholderPost}
                            className={'text-sm'}
                        />
                    </div>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
    />
)