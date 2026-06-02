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

import { ProfileInfo } from './ProfileInfo'

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
                <div className={'relative'}>
                    <UserAvatar
                        initials={initials}
                        imageSrc={user.profile?.image ?? undefined}
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
