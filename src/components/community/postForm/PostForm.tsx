'use client'

import { useEffect } from 'react'

import { PostFormActions } from '@/components/community/postForm/PostFormActions'
import { PostFormAnonymousToggle } from '@/components/community/postForm/PostFormAnonymousToggle'
import { PostFormBody } from '@/components/community/postForm/PostFormBody'
import { PostFormFields } from '@/components/community/postForm/PostFormFields'
import { PostFormHeader } from '@/components/community/postForm/PostFormHeader'
import { PostFormPrivacyNote } from '@/components/community/postForm/PostFormPrivacyNote'
import { Form } from '@/components/ui/form'

import { usePostForm } from '@/hooks/forms/usePostForm'
import { useProfileQuery } from '@/hooks/profile/useProfileQuery'

import { PostFormSchema } from '@/validations/forms/postFormSchema'

type PostFormProps = {
    isReply: boolean
    isOpen: boolean
    isLoading: boolean
    onSubmitAction: (data: PostFormSchema) => Promise<void>
    onCancelAction?: () => void
    defaultValues?: Partial<PostFormSchema>
    submitLabel?: string
    hideHeader?: boolean
    showAnonymousToggle?: boolean
}

export const PostForm = ({
    isReply,
    isOpen,
    isLoading,
    onSubmitAction,
    onCancelAction,
    defaultValues,
    submitLabel,
    hideHeader = false,
    showAnonymousToggle = false
}: PostFormProps) => {
    const { data: profile } = useProfileQuery()
    // The profile holds the last choice; off until it says otherwise
    const lastChoice = profile?.anonymousParticipation ?? false
    const { form, handleSubmit } = usePostForm({
        onSubmit: onSubmitAction,
        isReply,
        defaultValues: showAnonymousToggle
            ? { isAnonymous: lastChoice, ...defaultValues }
            : defaultValues
    })

    useEffect(() => {
        if (
            showAnonymousToggle
            && defaultValues?.isAnonymous === undefined
            && !form.getFieldState('isAnonymous').isDirty
        ) {
            form.setValue('isAnonymous', lastChoice)
        }
    }, [
        lastChoice,
        showAnonymousToggle,
        defaultValues?.isAnonymous,
        form
    ])

    if (!isOpen) return null

    return (
        <div className={'rounded-2xl bg-surface-card p-4 sm:p-6 shadow-md border border-primary'}>
            {!hideHeader && (
                <PostFormHeader
                    isReply={isReply}
                    onCancelAction={onCancelAction}
                />
            )}

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
                    {showAnonymousToggle && (
                        <PostFormAnonymousToggle form={form}/>
                    )}
                    <PostFormPrivacyNote/>
                    <PostFormActions
                        isReply={isReply}
                        onCancelAction={onCancelAction}
                        isLoading={isLoading}
                        isDisabled={!form.formState.isValid}
                        submitLabel={submitLabel}
                    />
                </Form>
            </form>
        </div>
    )
}
