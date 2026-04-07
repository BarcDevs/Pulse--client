'use client'

import { PostFormActions } from '@/components/community/postForm/PostFormActions'
import { PostFormBody } from '@/components/community/postForm/PostFormBody'
import { PostFormFields } from '@/components/community/postForm/PostFormFields'
import { PostFormHeader } from '@/components/community/postForm/PostFormHeader'
import { Form } from '@/components/ui/form'

import { usePostForm } from '@/hooks/forms/usePostForm'
import { useForumPostMutations } from '@/hooks/mutations/useForumPostMutations'

import { usePostDetail } from '@/context/PostDetailContext'

import { PostFormSchema } from '@/validations/forms/postFormSchema'

type PostFormProps = {
    isReply: boolean
    postId: string
    isOpen?: boolean
    onCancelAction?: () => void
}

export const PostForm = ({
    isReply,
    postId,
    isOpen,
    onCancelAction
}: PostFormProps) => {
    const { createReply } = useForumPostMutations({
        postId
    })
    const { setIsReplyFormOpen } = usePostDetail()

    const handleReplySubmit = async (
        data: PostFormSchema
    ) => {
        await createReply.mutateAsync(data)
        setIsReplyFormOpen(false)
    }

    const { form, handleSubmit } = usePostForm({
        onSubmit: handleReplySubmit
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
                    {!isReply
                        && <PostFormFields form={form}/>}
                    <PostFormBody
                        form={form}
                        isReply={isReply}
                    />
                    <PostFormActions
                        isReply={isReply}
                        onCancelAction={onCancelAction}
                        isLoading={createReply.isPending}
                    />
                </Form>
            </form>
        </div>
    )
}
