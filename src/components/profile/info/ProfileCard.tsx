'use client'

import {
    useEffect,
    useState
} from 'react'

import type { CheckInStats } from '@/types/checkIn'

import { UserAvatar } from '@/components/shared/UserAvatar'
import { Card, CardContent } from '@/components/ui/card'

import { useUser } from '@/hooks/ui/useUser'

import { getUserFallback } from '@/lib/utils'

import { fetchCheckInStats } from '@/api/checkIn'

import { ProfileStats } from '../stats/ProfileStats'

import { ProfileInfo } from './ProfileInfo'
import { ProfileLevel } from './ProfileLevel'

export const ProfileCard = () => {
    const { user } = useUser()
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

    if (!user)
        return null

    const initials = getUserFallback(
        user.firstName,
        user.lastName
    )
    const streak = stats?.currentStreak ?? 0

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardContent className={'flex flex-col items-center pt-8 text-center'}>
                <div className={'relative'}>
                    <UserAvatar
                        initials={initials}
                        imageSrc={user.profile?.image ?? undefined}
                        className={{
                            wrapper: 'size-24 border-4 border-primary-light',
                            fallback: 'bg-primary text-2xl text-white'
                        }}
                    />
                    <div className={'absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-2 border-white bg-secondary text-xs font-bold text-white'}>
                        {streak}
                    </div>
                </div>

                <ProfileInfo
                    firstName={user.firstName}
                    lastName={user.lastName}
                    createdAt={user.createdAt}
                    dateFormat={user.profile?.dateFormat ?? undefined}
                />

                <ProfileLevel/>

                <ProfileStats/>
            </CardContent>
        </Card>
    )
}
