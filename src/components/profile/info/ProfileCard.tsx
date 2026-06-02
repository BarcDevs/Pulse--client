'use client'

import { Camera } from 'lucide-react'

import { UserAvatar } from '@/components/shared/UserAvatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { useUser } from '@/hooks/ui/useUser'

import { getUserFallback } from '@/lib/utils'

import { FEATURES } from '@/config/features'

import { ProfileStats } from '../stats/ProfileStats'

import { ProfileCardSkeleton } from './ProfileCardSkeleton'
import { ProfileInfo } from './ProfileInfo'
import { ProfileLevel } from './ProfileLevel'

export const ProfileCard = () => {
    const { user, isLoading } = useUser()

    if (isLoading) return <ProfileCardSkeleton/>
    if (!user) return null

    const initials = getUserFallback(
        user.firstName,
        user.lastName
    )

    // TODO: level data not yet in Profile type — requires server changes
    const level = 3

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

                    {FEATURES.profileImageUpload && (
                        <Button
                            size={'icon'}
                            variant={'ghost'}
                            className={'absolute -bottom-1 -left-1 size-7 rounded-full border-2 border-white bg-muted text-muted-foreground hover:bg-muted/80'}
                        >
                            <Camera className={'size-3.5'}/>
                        </Button>
                    )}

                    {FEATURES.profileLevel && (
                        // todo: add a tooltip
                        <div className={'absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-2 border-white bg-secondary text-xs font-bold text-white'}>
                            {level}
                        </div>
                    )}
                </div>

                <ProfileInfo
                    firstName={user.firstName}
                    lastName={user.lastName}
                    createdAt={user.createdAt}
                />

                {FEATURES.profileLevel && <ProfileLevel/>}

                <ProfileStats/>
            </CardContent>
        </Card>
    )
}
