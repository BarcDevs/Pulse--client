'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { GoalStatus } from '@/types/goals'

import { GoalProgressBar } from '@/components/shared/bars/GoalProgressBar'
import { EmptyState } from '@/components/shared/EmptyState'
import { buttonVariants } from '@/components/ui/button'

import { useGoals } from '@/hooks/queries/useGoals'

import { cn } from '@/lib/utils'

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
        <div className={'rounded-2xl bg-primary p-6 text-primary-foreground'}>
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

            <Link
                href={ROUTES.RECOVERY_GOALS}
                className={cn(
                    buttonVariants({
                        variant: 'secondary'
                    }),
                    'w-full mt-6 bg-white/20',
                    'hover:bg-white/30 text-primary-foreground',
                    'border-0'
                )}
            >
                {t(profileLocales.goals.viewRoadmap)}
            </Link>
        </div>
    )
}
