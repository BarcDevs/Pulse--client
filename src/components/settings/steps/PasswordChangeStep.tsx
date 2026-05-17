'use client'

import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { useMutation } from '@tanstack/react-query'

import { DynamicFormField } from '@/components/form/DynamicFormField'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useChangePasswordForm } from '@/hooks/forms/useChangePasswordForm'

import { changePassword } from '@/api/users'
import { settingsLocales } from '@/locales/settingsLocales'

const passwordFields = {
    currentPassword: {
        type: 'password' as const,
        label: settingsLocales.security.password.currentPassword,
        className: 'bg-surface-card'
    },
    newPassword: {
        type: 'password' as const,
        label: settingsLocales.security.password.newPassword,
        className: 'bg-surface-card'
    },
    confirmPassword: {
        type: 'password' as const,
        label: settingsLocales.security.password.confirmPassword,
        className: 'bg-surface-card'
    }
}

type Props = {
    onSuccessAction: () => void
    onCancelAction: () => void
}

export const PasswordChangeStep = ({
    onSuccessAction,
    onCancelAction
}: Props) => {
    const t = useTranslations()
    const {
        mutateAsync: submitChange,
        isPending
    } = useMutation({
        mutationFn: changePassword
    })
    const { form, handleSubmit } = useChangePasswordForm({
        onSubmit: async (data) => {
            await submitChange({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            })
            toast.success(t(settingsLocales.security.password.successToast))
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
                    name={'currentPassword'}
                    control={form.control}
                    config={passwordFields.currentPassword}
                />
                <DynamicFormField
                    name={'newPassword'}
                    control={form.control}
                    config={passwordFields.newPassword}
                />
                <DynamicFormField
                    name={'confirmPassword'}
                    control={form.control}
                    config={passwordFields.confirmPassword}
                />
                {form.formState.errors.root && (
                    <p className={'text-sm text-destructive'}>
                        {form.formState.errors.root.message}
                    </p>
                )}
                <div className={'flex gap-2 pt-1'}>
                    <Button
                        type={'submit'}
                        size={'sm'}
                        disabled={isPending || !form.formState.isValid}
                    >
                        {isPending
                            ? t(settingsLocales.security.password.changingButton)
                            : t(settingsLocales.security.password.changeButton)
                        }
                    </Button>
                    <Button
                        type={'button'}
                        size={'sm'}
                        variant={'outline'}
                        onClick={onCancelAction}
                        disabled={isPending}
                    >
                        {t(settingsLocales.security.password.cancelButton)}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
