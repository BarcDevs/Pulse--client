'use client'

import { Camera } from 'lucide-react'

import { ProfileLevel } from '@/components/profile/info/ProfileLevel'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
        <Card className={'border-0 shadow-sm'}>
            <CardContent className={'flex flex-col items-center px-6 text-center'}>
                <div className={'relative'}>
                    <UserAvatar
                        initials={initials}
                        imageSrc={currentUser.user.profile?.image ?? undefined}
                        className={{
                            wrapper: 'size-24 border-4 border-primary-light',
                            fallback: 'bg-primary text-2xl text-white'
                        }}
                    />

                    {/* TODO: profile image upload — deferred to scaling phase */}
                    {FEATURES.profileImageUpload && (
                        <Button
                            size={'icon'}
                            variant={'ghost'}
                            className={'absolute -bottom-1 -left-1 size-7 rounded-full border-2 border-white bg-muted text-muted-foreground hover:bg-muted/80'}
                        >
                            <Camera className={'size-3.5'}/>
                        </Button>
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
