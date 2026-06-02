'use client'

import {
    useLocale,
    useTranslations
} from 'next-intl'

import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import {
    categoryOrder,
    getInterestCategory,
    getInterestName,
    healthInterestSlugs
} from '@/constants/mappings/healthInterestNames'
import {
    healthInterestIconMap,
    recoveryCategoryStyleMap
} from '@/constants/mappings/profile'

import { useProfileEditContext } from '@/context/ProfileEditContext'

import { profileLocales } from '@/locales/profileLocales'

export const RecoveryIdentityPicker = () => {
    const t = useTranslations()
    const locale = useLocale()
    const { profileFields, toggleProfileItem } = useProfileEditContext()

    const selectedSlugs = new Set(profileFields.healthInterests)

    const groups = categoryOrder
        .map((category) => ({
            category,
            slugs: healthInterestSlugs.filter(
                (slug) => getInterestCategory(slug) === category
            )
        }))
        .filter((group) => group.slugs.length > 0)

    return (
        <div className={'space-y-5'}>
            {groups.map(({ category, slugs }) => {
                const style = recoveryCategoryStyleMap[category]
                const labelKey =
                    profileLocales.interestCategories[
                        category as keyof typeof profileLocales.interestCategories
                    ]

                return (
                    <div key={category}>
                        <div className={'mb-2.5 flex items-center gap-2'}>
                            <span className={cn('size-2 rounded-full', style?.dot)}/>
                            <span className={'label-uppercase text-xs font-semibold text-muted-foreground'}>
                                {t(labelKey)}
                            </span>
                        </div>
                        <div className={'flex flex-wrap gap-2'}>
                            {slugs.map((slug) => {
                                const isSelected = selectedSlugs.has(slug)
                                const IconComponent = healthInterestIconMap[slug]

                                return (
                                    <Button
                                        key={slug}
                                        variant={'ghost'}
                                        size={'sm'}
                                        onClick={() => toggleProfileItem('healthInterests', slug)}
                                        className={cn(
                                            'inline-flex h-auto items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all',
                                            isSelected
                                                ? style?.selected
                                                : 'border-border bg-card text-muted-foreground hover:bg-muted'
                                        )}
                                    >
                                        {IconComponent && (
                                            <IconComponent className={'size-3.5'}/>
                                        )}
                                        {getInterestName(slug, locale)}
                                        {isSelected && <Check className={'size-3'}/>}
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
