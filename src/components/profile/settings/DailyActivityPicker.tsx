'use client'

import { useLocale } from 'next-intl'

import { ActivityToggleButton } from '@/components/shared/inputs/ActivityToggleButton'

import { useProfileOptionsQuery } from '@/hooks/profile/useProfileOptionsQuery'

import { getActivityName } from '@/constants/mappings/activityNames'

import { useProfileEditContext } from '@/context/ProfileEditContext'

export const DailyActivityPicker = () => {
    const locale = useLocale()
    const { data: options } = useProfileOptionsQuery()
    const { profileFields, toggleProfileItem } = useProfileEditContext()

    const selectedSlugs = new Set(profileFields.activityPreferences)
    const available = options?.activityPreferences ?? []

    return (
        <div className={'flex flex-wrap gap-2'}>
            {available.map((slug) => (
                <ActivityToggleButton
                    key={slug}
                    activity={slug}
                    label={getActivityName(slug, locale)}
                    isSelected={selectedSlugs.has(slug)}
                    onToggle={(s) => toggleProfileItem('activityPreferences', s)}
                />
            ))}
        </div>
    )
}
