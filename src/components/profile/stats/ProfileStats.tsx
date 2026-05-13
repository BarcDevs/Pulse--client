'use client'

import {
    useEffect,
    useState
} from 'react'

import { useTranslations } from 'next-intl'

import type { CheckInStats } from '@/types/checkIn'
import { GoalStatus } from '@/types/goals'

import { useGoals } from '@/hooks/queries/useGoals'

import { fetchCheckInStats } from '@/api/checkIn'
import { profileLocales } from '@/locales/profileLocales'

import { ProfileStatItem } from './ProfileStatItem'

export const ProfileStats = () => {
    const t = useTranslations()
    const [stats, setStats] = useState<CheckInStats | null>(null)
    const { data: goals } = useGoals()

    useEffect(() => {
        const getStats = async () => {
            try {
                const data = await fetchCheckInStats()
                setStats(data)
            } catch (err) {
                console.error('Failed to fetch stats:', err)
            }
        }

        getStats()
    }, [])

    const streak = stats?.total ?? 0
    const milestones = stats?.milestonesAchieved ?? 0
    const activeGoals = goals?.filter((g) =>
        g.status === GoalStatus.ACTIVE).length ?? 0

    return (
        <div className={'mt-6 grid w-full grid-cols-3 gap-4 border-t border-border pt-6'}>
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
