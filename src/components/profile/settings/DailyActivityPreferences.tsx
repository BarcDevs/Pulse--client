'use client'

import {
    useLocale,
    useTranslations
} from 'next-intl'

import { EmptyState } from '@/components/shared/EmptyState'

import { useUser } from '@/hooks/ui/useUser'

import { getActivityName } from '@/constants/mappings/activityNames'

import { useProfileEditContext } from '@/context/ProfileEditContext'

import { profileLocales } from '@/locales/profileLocales'

import { DailyActivityPicker } from './DailyActivityPicker'
import { DailyActivityPreferencesSkeleton } from './DailyActivityPreferencesSkeleton'

export const DailyActivityPreferences = () => {
    const t = useTranslations()
    const locale = useLocale()
    const { user, isLoading } = useUser()
    const { isEditing } = useProfileEditContext()

    const selected = user?.profile?.activityPreferences ?? []

    return (
        <div className={'card-base h-full'}>
            <h3 className={'mb-2 text-lg font-semibold text-foreground'}>
                {t(profileLocales.dailyPreferences.title)}
            </h3>
            <p className={'mb-6 text-sm text-muted-foreground'}>
                {isEditing
                    ? t(profileLocales.dailyPreferences.editSubtitle)
                    : t(profileLocales.dailyPreferences.subtitle)
                }
            </p>

            {isLoading && !isEditing ? (
                <DailyActivityPreferencesSkeleton/>
            ) : isEditing ? (
                <DailyActivityPicker/>
            ) : selected.length === 0 ? (
                <EmptyState message={t(profileLocales.dailyPreferences.empty)}/>
            ) : (
                <div className={'flex flex-wrap gap-3'}>
                    {selected.map((slug) => (
                        <span
                            key={slug}
                            className={'inline-flex items-center gap-1.5 rounded-full border border-primary bg-primary-light px-4 py-2 text-sm font-semibold text-primary'}
                        >
                            {getActivityName(slug, locale)}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}
