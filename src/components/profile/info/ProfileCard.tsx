'use client'

import { Camera } from 'lucide-react'

import { ProfileLevel } from '@/components/profile/info/ProfileLevel'
import { UserAvatar } from '@/components/shared/avatars/UserAvatar'
import { IconButton } from '@/components/shared/buttons/IconButton'
import { Card } from '@/components/shared/cards/Card'
import { CardContent } from '@/components/ui/card'

import { useUser } from '@/hooks/ui/useUser'

import { getUserFallback } from '@/lib/utils'

import { FEATURES } from '@/config/features'

import { ProfileStats } from '../stats/ProfileStats'

import { ProfileCardSkeleton } from './ProfileCardSkeleton'
import { ProfileInfo } from './ProfileInfo'

export const ProfileCard = () => {
    const currentUser = useUser()

    if (currentUser.status.isLoading) return <ProfileCardSkeleton/>
    if (!currentUser.user) return null

    const initials = getUserFallback(
        currentUser.user.firstName,
        currentUser.user.lastName
    )

    return (
        <Card>
            <CardContent className={'flex flex-col items-center px-6 text-center'}>
                <div className={'relative'}>
                    <UserAvatar
                        initials={initials}
                        imageSrc={currentUser.user.profile?.image ?? undefined}
                        size={'xl'}
                        tone={'solid'}
                    />

                    {/* TODO: profile image upload — deferred to scaling phase */}
                    {FEATURES.profileImageUpload && (
                        <IconButton
                            outlined
                            round
                            className={'absolute -bottom-1 -left-1 size-7'}
                        >
                            <Camera className={'size-3.5'}/>
                        </IconButton>
                    )}
                </div>

                <ProfileInfo
                    firstName={currentUser.user.firstName}
                    lastName={currentUser.user.lastName}
                    createdAt={currentUser.user.createdAt}
                />

                {FEATURES.profileLevel && <ProfileLevel/>}

                <ProfileStats/>
            </CardContent>
        </Card>
    )
}
