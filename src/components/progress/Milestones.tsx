'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { GoalStatus } from '@/types/goals'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { useGoals } from '@/hooks/queries/useGoals'

import { ROUTES } from '@/constants/routes'

import { progressLocales } from '@/locales/progressLocales'

import { ProgressGoalsList } from './ProgressGoalsList'
import { ProgressMilestonesSkeletons } from './ProgressMilestonesSkeletons'

const TOP_GOALS_COUNT = 4

export const ProgressMilestones = () => {
    const t = useTranslations()
    const { data: goals, isLoading } = useGoals()

    const topGoals = goals
        ?.filter((g) => g.status === GoalStatus.ACTIVE)
        .sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
        .slice(0, TOP_GOALS_COUNT)

    return (
        <Card className={'mt-6 border-0 shadow-sm'}>
            <CardHeader className={'flex flex-row items-center justify-between'}>
                <CardTitle className={'text-lg font-semibold'}>
                    {t(progressLocales.milestones.title)}
                </CardTitle>
                <Link
                    href={ROUTES.RECOVERY_GOALS}
                    className={'text-sm text-muted-foreground transition-colors hover:text-foreground'}
                >
                    {t(progressLocales.milestones.seeAll)}
                </Link>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <ProgressMilestonesSkeletons count={TOP_GOALS_COUNT}/>
                ) : topGoals?.length === 0 ? (
                    <p className={'text-sm text-muted-foreground'}>
                        {t(progressLocales.milestones.empty)}
                    </p>
                ) : (
                    <ProgressGoalsList goals={topGoals ?? []}/>
                )}
            </CardContent>
        </Card>
    )
}
