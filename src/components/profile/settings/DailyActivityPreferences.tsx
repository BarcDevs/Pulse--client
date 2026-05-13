'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { useActivityMutations } from '@/hooks/mutations/useActivityMutations'
import { useProfileOptions } from '@/hooks/queries/useProfileOptions'
import { useUser } from '@/hooks/ui/useUser'

import { cn } from '@/lib/utils'

import { profileLocales } from '@/locales/profileLocales'

export const DailyActivityPreferences = () => {
    const t = useTranslations()
    const { user } = useUser()
    const { options } = useProfileOptions()
    const {
        addActivities,
        removeActivity,
        isPending
    } = useActivityMutations()

    const selectedSlugs = new Set(
        user?.profile?.activityPreferences?.
        map((a) => a.slug) ?? []
    )

    const handleToggle = (slug: string) => {
        if (selectedSlugs.has(slug)) {
            removeActivity(slug)
        } else {
            addActivities([slug])
        }
    }

    return (
        <div className={'card-base'}>
            <h3 className={'text-lg font-semibold text-foreground mb-2'}>
                {t(profileLocales.dailyPreferences.title)}
            </h3>
            <p className={'text-sm text-muted-foreground mb-6'}>
                {`Select activities you enjoy — we'll personalise your suggestions.`}
            </p>

            <div className={'flex--wrap gap-3'}>
                {options?.activityPreferences.map((activity) => {
                    const isSelected = selectedSlugs.has(activity.slug)

                    return (
                        <Button
                            key={activity.slug}
                            variant={'outline'}
                            disabled={isPending}
                            onClick={() => handleToggle(activity.slug)}
                            className={cn(
                                'rounded-full',
                                isSelected
                                    ? 'bg-primary-light text-primary border-primary'
                                    : 'bg-surface-card text-muted-foreground border-border hover:border-primary/50'
                            )}
                        >
                            {activity.name}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}
