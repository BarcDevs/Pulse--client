'use client'

import {
    useEffect,
    useState
} from 'react'

import { useTranslations } from 'next-intl'

import type { CheckInStats } from '@/types/checkIn'
import { GoalStatus } from '@/types/goals'

import { useGoals } from '@/hooks/queries/useGoals'
import { useRecoveryGoalsStats } from '@/hooks/queries/useRecoveryGoalsStats'

import { fetchCheckInStats } from '@/api/checkIn'
import { profileLocales } from '@/locales/profileLocales'

import { ProfileStatItem } from './ProfileStatItem'
import { ProfileStatsSkeleton } from './ProfileStatsSkeleton'

export const ProfileStats = () => {
    const t = useTranslations()
    const [stats, setStats] = useState<CheckInStats | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { data: goals } = useGoals()
    const { data: goalsStats } = useRecoveryGoalsStats()

    useEffect(() => {
        const getStats = async () => {
            try {
                const data = await fetchCheckInStats()
                setStats(data)
            } catch (err) {
                console.error('Failed to fetch stats:', err)
            } finally {
                setIsLoading(false)
            }
        }

        getStats()
    }, [])

    const streak = stats?.currentStreak ?? 0
    const milestones = goalsStats?.milestones.completed ?? 0
    const activeGoals = goals?.filter(
        (g) => g.status === GoalStatus.ACTIVE
    ).length ?? 0

    if (isLoading) return <ProfileStatsSkeleton/>

    return (
        <div className={'mt-5 grid w-full grid-cols-3 gap-4 border-t border-border pt-5'}>
            <ProfileStatItem
                value={String(streak)}
                label={t(profileLocales.stats.streak)}
            />
            <ProfileStatItem
                value={String(milestones)}
                label={t(profileLocales.stats.milestones)}
            />
            <ProfileStatItem
                value={String(activeGoals)}
                label={t(profileLocales.stats.goals)}
            />
        </div>
    )
}
