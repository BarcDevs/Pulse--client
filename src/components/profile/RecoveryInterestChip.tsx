'use client'

import { useLocale } from 'next-intl'

import type { HealthInterest } from '@/types/profile'

import { cn } from '@/lib/utils'

import { getInterestName } from '@/constants/mappings/healthInterestNames'
import {
    profileRecoveryIdentityColorMap,
    profileRecoveryIdentityIconMap
} from '@/constants/mappings/profile'

type RecoveryInterestChipProps = {
    interest: HealthInterest
}

export const RecoveryInterestChip = ({ interest }: RecoveryInterestChipProps) => {
    const locale = useLocale()
    const colorClass = profileRecoveryIdentityColorMap[interest.category] ?? 'bg-muted text-muted-foreground'
    const IconComponent = profileRecoveryIdentityIconMap[interest.category]

    return (
        <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full', colorClass)}>
            {IconComponent && (
                <IconComponent className={'size-4'}/>
            )}
            <span className={'text-sm font-medium'}>
                {getInterestName(interest.slug, locale)}
            </span>
        </div>
    )
}
