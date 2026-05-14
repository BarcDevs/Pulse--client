'use client'

import { useTranslations } from 'next-intl'

import { type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type FeatureCardProps = {
    icon: LucideIcon
    titleKey: string
    descKey: string
    iconClassName: string
}

export const FeatureCard = ({
    icon: Icon,
    titleKey,
    descKey,
    iconClassName
}: FeatureCardProps) => {
    const t = useTranslations()

    return (
        <div className={'rounded-2xl bg-surface-card p-7 shadow-sm transition-shadow duration-200 hover:shadow-md'}>
            <div className={cn(
                'mb-5 flex size-11 items-center justify-center rounded-xl',
                iconClassName
            )}>
                <Icon size={22}/>
            </div>
            <h3 className={'mb-2.5 text-base font-bold text-foreground'}>
                {t(titleKey)}
            </h3>
            <p className={'text-sm leading-relaxed text-muted-foreground'}>
                {t(descKey)}
            </p>
        </div>
    )
}
