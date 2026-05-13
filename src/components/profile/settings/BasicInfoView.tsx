'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { useUser } from '@/hooks/ui/useUser'

import { profileLocales } from '@/locales/profileLocales'

type BasicInfoViewProps = {
    onEditAction: () => void
}

export const BasicInfoView = ({
    onEditAction
}: BasicInfoViewProps) => {
    const t = useTranslations()
    const { user } = useUser()

    if (!user) return null

    const fields = [
        {
            label: t(profileLocales.basicInfo.fullName),
            value: `${user.firstName} ${user.lastName}`
        },
        {
            label: t(profileLocales.basicInfo.emailAddress),
            value: user.email
        },
        {
            label: t(profileLocales.basicInfo.location),
            value: user.profile?.location
                ?? t(profileLocales.basicInfo.locationNotSet)
        }
        // TODO: add dateOfBirth once API supports it
        // TODO: add recoveryType once API supports it
        // TODO: add careProvider once API supports it
    ]

    return (
        <>
            <div className={'grid gap-6 sm:grid-cols-2'}>
                {fields.map((field) => (
                    <div key={field.label}>
                        <p className={'label-uppercase label-rtl text-muted-foreground'}>
                            {field.label}
                        </p>
                        <p className={'mt-1 text-sm font-medium text-foreground'}>
                            {field.value}
                        </p>
                    </div>
                ))}
            </div>
            <div className={'mt-6'}>
                <Button
                    variant={'outline'}
                    size={'sm'}
                    onClick={onEditAction}
                >
                    {t(profileLocales.basicInfo.edit)}
                </Button>
            </div>
        </>
    )
}
