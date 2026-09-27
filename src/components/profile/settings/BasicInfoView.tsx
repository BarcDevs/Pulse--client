'use client'

import { useLocale, useTranslations } from 'next-intl'

import { he } from 'date-fns/locale'

import { ErrorStateCard } from '@/components/shared/ErrorStateCard'

import { useUser } from '@/hooks/ui/useUser'

import { formatByUserPreference } from '@/lib/time'

import { profileLocales } from '@/locales/profileLocales'

import { BasicInfoSkeleton } from './BasicInfoSkeleton'

export const BasicInfoView = () => {
    const t = useTranslations()
    const locale = useLocale()
    const dateFnsLocale = locale === 'he-IL' ? he : undefined
    const currentUser = useUser()

    if (currentUser.status.isLoading) return <BasicInfoSkeleton/>
    if (!currentUser.user) return <ErrorStateCard error={currentUser.status.error instanceof Error ? currentUser.status.error : null}/>

    const fields = [
        {
            label: t(profileLocales.basicInfo.fullName),
            value: `${currentUser.user.firstName} ${currentUser.user.lastName}`
        },
        {
            label: t(profileLocales.basicInfo.username),
            value: `@${currentUser.user.username}`
        },
        {
            label: t(profileLocales.basicInfo.emailAddress),
            value: currentUser.user.email
        },
        {
            label: t(profileLocales.basicInfo.dateOfBirth),
            value: currentUser.user.dateOfBirth
                ? formatByUserPreference(
                    new Date(currentUser.user.dateOfBirth),
                    false,
                    undefined,
                    dateFnsLocale
                ) : null
        },
        {
            label: t(profileLocales.basicInfo.location),
            value: currentUser.user.profile?.location ?? null
        },
        {
            label: t(profileLocales.basicInfo.recoveryType),
            value: currentUser.user.recoveryType ?? null
        },
        {
            label: t(profileLocales.basicInfo.careProvider),
            value: currentUser.user.careProvider ?? null
        }
    ]

    return (
        <div className={'grid gap-x-8 gap-y-4 sm:grid-cols-2'}>
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
