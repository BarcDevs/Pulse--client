'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { AuthFormType } from '@/types/forms'
import { SetState } from '@/types/react'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useAuthForm } from '@/hooks/forms/useAuthForm'

import authFormConfigs from '@/config/forms/authFormConfig'

import { DynamicFormField } from './DynamicFormField'

type AuthFormProps = {
    formType: AuthFormType
    onSuccessAction: SetState<any>
    isLoading?: boolean
    onPasswordChangeAction?: SetState<string>
}

export const AuthForm = ({
    formType,
    onSuccessAction,
    isLoading = false,
    onPasswordChangeAction
}: AuthFormProps) => {
    const t = useTranslations()
    const { form, handleSubmit } = useAuthForm({
        formType,
        onSuccessAction
    })

    const isPasswordFormType =
        formType === 'resetPassword'
        || formType === 'signup'

    const passwordValue = isPasswordFormType
        ? (form.watch('password' as any) as string)
        : undefined

    useEffect(() => {
        if (
            onPasswordChangeAction
            && isPasswordFormType
            && typeof passwordValue === 'string'
        ) {
            onPasswordChangeAction(passwordValue)
        }
    }, [
        passwordValue,
        onPasswordChangeAction,
        isPasswordFormType
    ])

    const config = authFormConfigs[formType]

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit}
                className={'space-y-4'}
            >
                {Object.entries(config.fields).map(
                    ([name, fieldConfig]) => (
                        <DynamicFormField
                            key={name}
                            name={name as any}
                            control={form.control}
                            config={fieldConfig}
                        />
                    )
                )}

                <Button
                    type={'submit'}
                    disabled={isLoading}
                    className={'h-11 w-full'}
                >
                    {isLoading
                        ? t(config.buttons.primary.loadingLabel)
                        : t(config.buttons.primary.label)
                    }
                </Button>

                {config.links?.map(link => (
                    <div
                        key={link.href}
                        className={'text-center text-sm'}
                    >
                        <Link
                            href={link.href}
                            className={'text-primary hover:underline'}
                        >
                            {t(link.label)}
                        </Link>
                    </div>
                ))}
            </form>
        </Form>
    )
}
