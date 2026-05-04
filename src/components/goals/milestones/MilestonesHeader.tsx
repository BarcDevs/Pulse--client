'use client'

import { useTranslations } from 'next-intl'

import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { goalsLocales } from '@/locales/goalsLocales'

import { SectionHeader } from '../SectionHeader'

type MilestonesHeaderProps = {
    onViewAll?: () => void
}

export const MilestonesHeader = ({
    onViewAll
}: MilestonesHeaderProps) => {
    const t = useTranslations()

    return (
        <div className={'flex items-center justify-between mb-6'}>
            <SectionHeader
                title={t(goalsLocales.milestones.title)}
                subtitle={t(goalsLocales.milestones.subtitle)}
            />

            <Button
                variant={'ghost'}
                onClick={onViewAll}
                className={'text-white/70 hover:text-white'}
            >
                {t(goalsLocales.milestones
                    .viewAll)}

            <ChevronRight className={'ml-2 h-4 w-4'}/>
            </Button>
        </div>
    )
}
