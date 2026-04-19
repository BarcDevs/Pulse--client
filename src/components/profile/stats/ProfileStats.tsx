'use client'

import {
    useEffect,
    useState
} from 'react'

import type { CheckInStats } from '@/types/checkIn'

import { profilePageTexts } from '@/constants/componentTexts/profile'

import { fetchCheckInStats } from '@/api/checkIn'

import { ProfileStatItem } from './ProfileStatItem'

export const ProfileStats = () => {
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
    const days = stats?.total ?? profilePageTexts.stats.days.value
    const milestones = stats?.milestonesAchieved ?? profilePageTexts.stats.milestones.value

    return (
        <div className={'mt-6 grid w-full grid-cols-3 gap-4 border-t border-border pt-6'}>
            <ProfileStatItem
                value={String(days)}
                label={profilePageTexts.stats.days.label}
            />
            <ProfileStatItem
                value={String(milestones)}
                label={profilePageTexts.stats.milestones.label}
            />
            <ProfileStatItem
                value={profilePageTexts.stats.healthScore.value}
                label={profilePageTexts.stats.healthScore.label}
            />
        </div>
    )
}
