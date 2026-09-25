'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { GoalStatus } from '@/types/goals'

import { GoalProgressBar } from '@/components/shared/bars/GoalProgressBar'
import { Button } from '@/components/shared/buttons/Button'
import { EmptyState } from '@/components/shared/EmptyState'

import { useGoals } from '@/hooks/queries/useGoals'

import { ROUTES } from '@/constants/routes'

import { profileLocales } from '@/locales/profileLocales'

import { ActiveGoalsSkeleton } from './ActiveGoalsSkeleton'

export const ActiveGoals = () => {
    const t = useTranslations()
    const { data: goals, isLoading } = useGoals()

    const activeGoals = goals
        ?.filter(
            (goal) => goal.status === GoalStatus.ACTIVE
        )
        .sort(
            (a, b) => (b.progress ?? 0) - (a.progress ?? 0)
        )
        .slice(0, 3)

    return (
        <div className={'rounded-2xl bg-primary p-6 text-primary-foreground h-full'}>
            <h3 className={'text-lg font-semibold mb-6'}>
                {t(profileLocales.goals.title)}
            </h3>

            <div className={'space-y-4'}>
                {isLoading && (
                    <ActiveGoalsSkeleton/>
                )}

                {!isLoading && (!activeGoals || activeGoals.length === 0) && (
                    <EmptyState
                        message={t(profileLocales.goals.title)}
                        className={'text-white/70'}
                    />
                )}

                {!isLoading && activeGoals?.map((goal) => (
                    <GoalProgressBar
                        key={goal.id}
                        label={goal.title}
                        progress={Math.round((goal.progress ?? 0) * 100)}
                        variant={'white'}
                    />
                ))}
            </div>

            <Button
                asChild
                variant={'onGradient'}
                className={'w-full mt-6'}
            >
                <Link href={ROUTES.RECOVERY_GOALS}>
                    {t(profileLocales.goals.viewRoadmap)}
                </Link>
            </Button>
        </div>
    )
}
