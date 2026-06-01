'use client'

import { useTranslations } from 'next-intl'

import { EmptyState } from '@/components/shared/EmptyState'

import { useUser } from '@/hooks/ui/useUser'

import { profileLocales } from '@/locales/profileLocales'

import { DailyActivityPreferencesSkeleton } from './DailyActivityPreferencesSkeleton'

export const DailyActivityPreferences = () => {
    const t = useTranslations()
    const { user, isLoading } = useUser()

    const selected = user?.profile?.activityPreferences ?? []

    return (
        <div className={'card-base h-full'}>
            <h3 className={'mb-2 text-lg font-semibold text-foreground'}>
                {t(profileLocales.dailyPreferences.title)}
            </h3>
            <p className={'mb-6 text-sm text-muted-foreground'}>
                {t(profileLocales.dailyPreferences.subtitle)}
            </p>

            {/* TODO: show full toggleable list when global isEditing is true */}
            {isLoading
                ? <DailyActivityPreferencesSkeleton/>
                : selected.length === 0
                    ? <EmptyState message={t(profileLocales.dailyPreferences.empty)}/>
                    : (
                        <div className={'flex--wrap gap-3'}>
                            {selected.map((activity) => (
                                <span
                                    key={activity.slug}
                                    className={'rounded-full border border-primary bg-primary-light px-4 py-2 text-sm font-semibold text-primary'}
                                >
                                    {activity.description}
                                </span>
                            ))}
                        </div>
                    )
            }
        </div>
    )
}
