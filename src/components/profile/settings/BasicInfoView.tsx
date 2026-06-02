'use client'

import { useTranslations } from 'next-intl'

import { ErrorStateCard } from '@/components/shared/ErrorStateCard'

import { useUser } from '@/hooks/ui/useUser'

import { profileLocales } from '@/locales/profileLocales'

import { BasicInfoSkeleton } from './BasicInfoSkeleton'

export const BasicInfoView = () => {
    const t = useTranslations()
    const { user, isLoading, error } = useUser()

    if (isLoading) return <BasicInfoSkeleton/>
    if (!user) return <ErrorStateCard error={error instanceof Error ? error : null}/>

    const fields = [
        {
            label: t(profileLocales.basicInfo.fullName),
            value: `${user.firstName} ${user.lastName}`
        },
        {
            label: t(profileLocales.basicInfo.username),
            value: `@${user.username}`
        },
        {
            label: t(profileLocales.basicInfo.emailAddress),
            value: user.email
        },
        {
            label: t(profileLocales.basicInfo.dateOfBirth),
            value: user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : null
        },
        {
            label: t(profileLocales.basicInfo.location),
            value: user.profile?.location ?? null
        },
        {
            label: t(profileLocales.basicInfo.recoveryType),
            value: user.recoveryType ?? null
        },
        {
            label: t(profileLocales.basicInfo.careProvider),
            value: user.careProvider ?? null
        }
    ]

    return (
        <div className={'grid gap-x-8 gap-y-0 sm:grid-cols-2'}>
            {fields.map((field) => (
                <div
                    key={field.label}
                    className={'border-b border-border pb-3.5'}
                >
                    <p className={'label-uppercase label-rtl mb-1.5 text-muted-foreground'}>
                        {field.label}
                    </p>
                    <p className={'text-[15px] font-semibold text-foreground'}>
                        {field.value ?? (
                            <span className={'font-normal italic text-muted-foreground'}>
                                {t(profileLocales.basicInfo.notSet)}
                            </span>
                        )}
                    </p>
                </div>
            ))}
        </div>
    )
}
