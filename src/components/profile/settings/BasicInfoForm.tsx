'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import type { Control } from 'react-hook-form'

import { FormInputField } from '@/components/shared/inputs/FormInputField'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useBasicInfoForm } from '@/hooks/forms/useBasicInfoForm'
import { useBasicInfoSubmit } from '@/hooks/profile/useBasicInfoSubmit'
import { useUser } from '@/hooks/ui/useUser'

import { ROUTES } from '@/constants/routes'

import { profileLocales } from '@/locales/profileLocales'

type BasicInfoFormProps = {
    onCancelAction: () => void
}

export const BasicInfoForm = ({
    onCancelAction
}: BasicInfoFormProps) => {
    const t = useTranslations()
    const { user } = useUser()
    const { onSubmit, isSaving } = useBasicInfoSubmit(onCancelAction)
    const { form, handleSubmit } = useBasicInfoForm({
        onSubmit,
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            location: user?.profile?.location ?? undefined
        }
    })

    if (!user) return null

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit}>
                <div className={'grid gap-4 sm:grid-cols-2'}>
                    <div className={'flex gap-2'}>
                        <FormInputField
                            control={form.control as Control<any>}
                            name={'firstName'}
                            label={t(profileLocales.basicInfo.firstName)}
                            labelClassName={'label-uppercase label-rtl text-muted-foreground font-normal'}
                            render={(field) => (
                                <Input
                                    {...field}
                                    placeholder={t(profileLocales.basicInfo.firstName)}
                                />
                            )}
                        />
                        <FormInputField
                            control={form.control as Control<any>}
                            name={'lastName'}
                            label={t(profileLocales.basicInfo.lastName)}
                            labelClassName={'label-uppercase label-rtl text-muted-foreground font-normal'}
                            render={(field) => (
                                <Input
                                    {...field}
                                    placeholder={t(profileLocales.basicInfo.lastName)}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <p className={'label-uppercase label-rtl text-muted-foreground mb-2'}>
                            {t(profileLocales.basicInfo.emailAddress)}
                        </p>
                        <p className={'text-sm text-muted-foreground'}>
                            {user.email}
                        </p>
                        <p className={'text-xs text-muted-foreground mt-1'}>
                            {`${t(profileLocales.basicInfo.emailNote)} `}
                            <Link 
                                href={ROUTES.PROFILE_SETTINGS} 
                                className={'underline hover:text-foreground'}
                            >
                                {t(profileLocales.basicInfo.emailNoteLink)}
                            </Link>
                        </p>
                    </div>

                    <FormInputField
                        control={form.control as Control<any>}
                        name={'location'}
                        label={t(profileLocales.basicInfo.location)}
                        labelClassName={'label-uppercase label-rtl text-muted-foreground font-normal'}
                        render={(field) => (
                            <Input
                                {...field}
                                placeholder={t(profileLocales.basicInfo.location)}
                            />
                        )}
                    />
                </div>

                {form.formState.errors.root && (
                    <p className={'mt-3 text-sm text-destructive'}>
                        {form.formState.errors.root.message}
                    </p>
                )}

                <div className={'mt-6 flex gap-3'}>
                    <Button
                        type={'submit'}
                        size={'sm'}
                        disabled={isSaving}
                    >
                        {isSaving
                            ? t(profileLocales.basicInfo.saving)
                            : t(profileLocales.basicInfo.save)
                        }
                    </Button>
                    <Button
                        type={'button'}
                        variant={'outline'}
                        size={'sm'}
                        onClick={() => {
                            form.reset()
                            onCancelAction()
                        }}
                        disabled={isSaving}
                    >
                        {t(profileLocales.basicInfo.cancel)}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
