'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { AuthFormType } from '@/types/forms'
import { SetState } from '@/types/react'

import { Button } from '@/components/shared/buttons/Button'
import { Form } from '@/components/ui/form'

import { useAuthForm } from '@/hooks/forms/useAuthForm'

import authFormConfigs from '@/config/forms/authFormConfig'

import { DynamicFormField } from './DynamicFormField'

type AuthFormProps = {
    formType: AuthFormType
    onSuccessAction: SetState<any>
    isLoading?: boolean
    error?: string | null
}

export const AuthForm = ({
    formType,
    onSuccessAction,
    isLoading = false,
    error
}: AuthFormProps) => {
    const t = useTranslations()
    const { form, handleSubmit } = useAuthForm({
        formType,
        onSuccessAction
    })

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

                {error && (
                    <p className={'text-sm text-destructive text-center'}>
                        {error}
                    </p>
                )}

                <Button
                    type={'submit'}
                    size={'xl'}
                    disabled={isLoading}
                    className={'w-full'}
                    data-testid={`${formType}-submit`}
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
