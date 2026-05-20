'use client'

import { PostFormActions } from '@/components/community/postForm/PostFormActions'
import { PostFormBody } from '@/components/community/postForm/PostFormBody'
import { PostFormFields } from '@/components/community/postForm/PostFormFields'
import { PostFormHeader } from '@/components/community/postForm/PostFormHeader'
import { Form } from '@/components/ui/form'

import { usePostForm } from '@/hooks/forms/usePostForm'

import { PostFormSchema } from '@/validations/forms/postFormSchema'

type PostFormProps = {
    isReply: boolean
    isOpen: boolean
    isLoading: boolean
    onSubmitAction: (data: PostFormSchema) => Promise<void>
    onCancelAction?: () => void
}

export const PostForm = ({
    isReply,
    isOpen,
    isLoading,
    onSubmitAction,
    onCancelAction
}: PostFormProps) => {
    const { form, handleSubmit } = usePostForm({
        onSubmit: onSubmitAction,
        isReply
    })

    if (!isOpen) return null

    return (
        <div className={'border-t border-border bg-white p-4'}>
            <PostFormHeader
                isReply={isReply}
                onCancelAction={onCancelAction}
            />

            <form
                onSubmit={handleSubmit}
                className={'space-y-4'}
            >
                <Form {...form}>
                    {!isReply && <PostFormFields form={form}/>}
                    <PostFormBody
                        form={form}
                        isReply={isReply}
                    />
                    <PostFormActions
                        isReply={isReply}
                        onCancelAction={onCancelAction}
                        isLoading={isLoading}
                        isDisabled={!form.formState.isValid}
                    />
                </Form>
            </form>
        </div>
    )
}
