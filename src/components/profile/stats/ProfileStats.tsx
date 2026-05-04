'use client'

import {
    useEffect,
    useState
} from 'react'

import { useTranslations } from 'next-intl'

import type { CheckInStats } from '@/types/checkIn'

import { fetchCheckInStats } from '@/api/checkIn'
import { profileLocales } from '@/locales/profileLocales'

import { ProfileStatItem } from './ProfileStatItem'

export const ProfileStats = () => {
    const t = useTranslations()
    const [stats, setStats] = useState<CheckInStats | null>(null)

    useEffect(() => {
        const getStats = async () => {
            try {
                const stats = await fetchCheckInStats()
                setStats(stats)
            } catch (err) {
                console.error('Failed to fetch stats:', err)
            }
        }

        getStats()
    }, [])

    // TODO: Add health score to CheckInStats type
    const days = stats?.total ?? '142'
    const milestones = stats?.milestonesAchieved ?? '28'

    return (
        <div className={'mt-6 grid w-full grid-cols-3 gap-4 border-t border-border pt-6'}>
            <ProfileStatItem
                value={String(days)}
                label={t(profileLocales.stats.days.label)}
            />
            <ProfileStatItem
                value={String(milestones)}
                label={t(profileLocales.stats.milestones.label)}
            />
            <ProfileStatItem
                value={'8.4'}
                label={t(profileLocales.stats.healthScore.label)}
            />
        </div>
    )
}
