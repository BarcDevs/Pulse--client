'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { HealthInterest } from '@/types/profile'

import { Button } from '@/components/ui/button'

import { useProfileOptionsQuery } from '@/hooks/profile/useProfileOptionsQuery'

import { cn } from '@/lib/utils'

import {
    profileRecoveryIdentityColorMap,
    profileRecoveryIdentityIconMap
} from '@/constants/mappings/profile'

import { profileLocales } from '@/locales/profileLocales'

type Props = {
    selected: HealthInterest[]
    onCloseAction: () => void
}

export const RecoveryIdentityPicker = ({
    selected,
    onCloseAction
}: Props) => {
    const t = useTranslations()
    const { data: options } = useProfileOptionsQuery()
    const [selectedSlugs, setSelectedSlugs] = useState(
        () => new Set(selected.map((i) => i.slug))
    )

    const toggle = (slug: string) => {
        setSelectedSlugs((prev) => {
            const next = new Set(prev)
            if (next.has(slug)) next.delete(slug)
            else next.add(slug)
            return next
        })
    }

    const available = options?.healthInterests ?? []

    return (
        <div>
            <div className={'flex--wrap gap-3 mb-4'}>
                {available.map((interest) => {
                    const isSelected = selectedSlugs.has(interest.slug)
                    const colorClass =
                        profileRecoveryIdentityColorMap[interest.category]
                        ?? 'bg-muted text-muted-foreground'
                    const IconComponent =
                        profileRecoveryIdentityIconMap[interest.category]

                    return (
                        <Button
                            key={interest.id}
                            variant={'ghost'}
                            size={'sm'}
                            onClick={() => toggle(interest.slug)}
                            className={cn(
                                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-opacity h-auto',
                                isSelected
                                    ? colorClass
                                    : 'bg-muted text-muted-foreground opacity-50'
                            )}
                        >
                            {IconComponent && (
                                <IconComponent className={'h-4 w-4'}/>
                            )}
                            {interest.name}
                        </Button>
                    )
                })}
            </div>
            <Button
                size={'sm'}
                onClick={onCloseAction}
            >
                {t(profileLocales.recoveryIdentity.done)}
            </Button>
        </div>
    )
}
