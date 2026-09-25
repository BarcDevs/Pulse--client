'use client'

import { useTranslations } from 'next-intl'

import { ChevronRight } from 'lucide-react'

import { TextButton } from '@/components/shared/buttons/TextButton'

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

            <TextButton
                tone={'onDark'}
                onClick={onViewAll}
            >
                {t(goalsLocales.milestones
                    .viewAll)}

            <ChevronRight className={'ms-2 h-4 w-4'}/>
            </TextButton>
        </div>
    )
}
