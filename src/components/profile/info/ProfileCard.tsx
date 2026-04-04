'use client'

import { Card, CardContent } from '@/components/ui/card'

import { useUser } from '@/hooks/ui/useUser'

import { getUserFallback } from '@/lib/utils'

import { ProfileStats } from '../stats/ProfileStats'

import { ProfileAvatar } from './ProfileAvatar'
import { ProfileInfo } from './ProfileInfo'
import { ProfileLevel } from './ProfileLevel'

export const ProfileCard = () => {
    const { user } = useUser()

    if (!user)
        return null

    const initials = getUserFallback(
        user.firstName,
        user.lastName
    )

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardContent className={'flex flex-col items-center pt-8 text-center'}>
                <ProfileAvatar initials={initials}/>

                <ProfileInfo
                    firstName={user.firstName}
                    lastName={user.lastName}
                />

                <ProfileLevel/>

                <ProfileStats/>
            </CardContent>
        </Card>
    )
}
