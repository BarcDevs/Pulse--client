'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { GoalStatus } from '@/types/goals'

import { ErrorStateCard } from '@/components/shared/ErrorStateCard'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { useGoals } from '@/hooks/queries/useGoals'

import { defaults } from '@/constants/defaults'
import { ROUTES } from '@/constants/routes'

import { progressLocales } from '@/locales/progressLocales'

import { ProgressGoalsList } from './ProgressGoalsList'
import { ProgressMilestonesSkeletons } from './ProgressMilestonesSkeletons'

const { topGoalsCount } = defaults.progress

export const ProgressMilestones = () => {
    const t = useTranslations()
    const {
        data: goals,
        isLoading,
        isError,
        error
    } = useGoals()

    const activeGoals = goals?.filter((g) => g.status === GoalStatus.ACTIVE) ?? []
    const topGoals = [...activeGoals]
        .sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
        .slice(0, topGoalsCount)

    return (
        <Card className={'mt-6 border-0 shadow-sm'}>
            <CardHeader className={'flex flex-row items-center justify-between'}>
                <CardTitle className={'text-lg font-semibold'}>
                    {t(progressLocales.milestones.title)}
                </CardTitle>
                {activeGoals.length > topGoalsCount && (
                    <Link
                        href={ROUTES.RECOVERY_GOALS}
                        className={'text-sm text-muted-foreground transition-colors hover:text-foreground'}
                    >
                        {t(progressLocales.milestones.seeAll, {
                            count: activeGoals.length
                        })}
                    </Link>
                )}
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <ProgressMilestonesSkeletons count={topGoalsCount}/>
                ) : isError ? (
                    <ErrorStateCard error={error}/>
                ) : activeGoals.length === 0 ? (
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
