'use client'

import {useEffect} from 'react'

import Link from 'next/link'

import {AuthFormType} from '@/types/forms'

import {Button} from '@/components/ui/button'
import {Form} from '@/components/ui/form'

import {useAuthForm} from '@/hooks/useAuthForm'

import authFormConfigs from '@/config/forms/authFormConfig'

import {DynamicFormField} from './DynamicFormField'

type AuthFormProps = {
    formType: AuthFormType
    onSuccess: (data: any) => void | Promise<void>
    isLoading?: boolean
    onPasswordChange?: (password: string) => void
}

export const AuthForm = ({
    formType,
    onSuccess,
    isLoading = false,
    onPasswordChange
}: AuthFormProps) => {
    const { form, handleSubmit } = useAuthForm({
        formType,
        onSuccess
    })

    const isPasswordFormType =
        formType === 'resetPassword' ||
        formType === 'signup'

    const passwordValue = isPasswordFormType
        ? (form.watch('password' as any) as string)
        : undefined

    useEffect(() => {
        if (
            onPasswordChange &&
            isPasswordFormType &&
            typeof passwordValue === 'string'
        ) {
            onPasswordChange(passwordValue)
        }
    }, [
        passwordValue,
        onPasswordChange,
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
                        ? config.buttons.primary.loadingLabel
                        : config.buttons.primary.label
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
                            {link.label}
                        </Link>
                    </div>
                ))}
            </form>
        </Form>
    )
}
