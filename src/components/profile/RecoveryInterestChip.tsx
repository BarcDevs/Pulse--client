'use client'

import { useLocale } from 'next-intl'

import { cn } from '@/lib/utils'

import {
    getInterestCategory,
    getInterestName
} from '@/constants/mappings/healthInterestNames'
import {
    healthInterestIconMap,
    recoveryCategoryStyleMap
} from '@/constants/mappings/profile'

type RecoveryInterestChipProps = {
    slug: string
}

export const RecoveryInterestChip = ({ slug }: RecoveryInterestChipProps) => {
    const locale = useLocale()
    const category = getInterestCategory(slug)
    const style = category ? recoveryCategoryStyleMap[category] : undefined
    const IconComponent = healthInterestIconMap[slug]

    return (
        <div className={cn('inline-flex items-center gap-2 rounded-full border px-4 py-2', style?.selected ?? 'border-transparent bg-muted text-muted-foreground')}>
            {IconComponent && (
                <IconComponent className={'size-4'}/>
            )}
            <span className={'text-sm font-medium'}>
                {getInterestName(slug, locale)}
            </span>
        </div>
    )
}
