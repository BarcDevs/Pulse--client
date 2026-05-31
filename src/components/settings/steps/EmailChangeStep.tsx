'use client'

import { useTranslations } from 'next-intl'

import { useMutation } from '@tanstack/react-query'

import { DynamicFormField } from '@/components/form/DynamicFormField'
import { FormError } from '@/components/shared/ui/FormError'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useChangeEmailForm } from '@/hooks/forms/useChangeEmailForm'

import { changeEmail } from '@/api/auth'
import { settingsLocales } from '@/locales/settingsLocales'

const emailFields = {
    newEmail: {
        type: 'email' as const,
        label: settingsLocales.security.email.newEmail,
        className: 'bg-surface-card'
    },
    password: {
        type: 'password' as const,
        label: settingsLocales.security.email.currentPassword,
        className: 'bg-surface-card'
    }
}

type Props = {
    onSuccessAction: () => void
    onCancelAction: () => void
}

export const EmailChangeStep = ({
    onSuccessAction,
    onCancelAction
}: Props) => {
    const t = useTranslations()
    const {
        mutateAsync: requestChange,
        isPending
    } = useMutation({
        mutationFn: changeEmail
    })
    const { form, handleSubmit } = useChangeEmailForm({
        onSubmit: async (data) => {
            await requestChange(data)
            onSuccessAction()
        }
    })

    return (
        <Form {...form}>
            <form
                className={'space-y-3 border-t border-border p-4'}
                onSubmit={handleSubmit}
            >
                <DynamicFormField
                    name={'newEmail'}
                    control={form.control}
                    config={emailFields.newEmail}
                />
                <DynamicFormField
                    name={'password'}
                    control={form.control}
                    config={emailFields.password}
                />
                <FormError errors={form.formState.errors}/>
                <div className={'flex gap-2 pt-1'}>
                    <Button
                        type={'submit'}
                        size={'sm'}
                        disabled={isPending || !form.formState.isValid}
                    >
                        {isPending
                            ? t(settingsLocales.security.email.sendingCodeButton)
                            : t(settingsLocales.security.email.sendCodeButton)
                        }
                    </Button>
                    <Button
                        type={'button'}
                        size={'sm'}
                        variant={'outline'}
                        onClick={onCancelAction}
                        disabled={isPending}
                    >
                        {t(settingsLocales.security.email.cancelButton)}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
