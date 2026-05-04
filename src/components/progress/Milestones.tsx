'use client'

import { useTranslations } from 'next-intl'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { progressMilestones }
    from '@/constants/progressMaps'

import { progressLocales } from '@/locales/progressLocales'

import { MilestoneCard } from './cards/MilestoneCard'

export const ProgressMilestones = () => {
    const t = useTranslations()

    return (
        <Card className={'mt-6 border-0 shadow-sm'}>
            <CardHeader className={'flex flex-row items-center justify-between'}>
                <CardTitle className={'text-lg font-semibold'}>
                    {t(progressLocales.milestones.title)}
                </CardTitle>
                <span className={'text-sm text-muted-foreground'}>
                    {t(progressLocales.milestones.seeAll)}
                </span>
            </CardHeader>
            <CardContent>
                <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
                    {progressMilestones.map((milestone) => (
                        <MilestoneCard
                            key={milestone.title}
                            icon={milestone.icon}
                            title={milestone.title}
                            description={milestone.description}
                            achieved={milestone.achieved}
                            iconBg={milestone.iconBg}
                            iconColor={milestone.iconColor}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
