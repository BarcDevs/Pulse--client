'use client'

import { useTranslations } from 'next-intl'

import { EmptyState } from '@/components/shared/EmptyState'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { useUser } from '@/hooks/ui/useUser'

import { profileLocales } from '@/locales/profileLocales'

import { ProfileBioSkeleton } from './ProfileBioSkeleton'

export const ProfileBio = () => {
    const t = useTranslations()
    const { user, isLoading } = useUser()

    if (isLoading) return <ProfileBioSkeleton/>

    const bio = user?.profile?.bio

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader>
                <CardTitle className={'text-lg font-semibold'}>
                    {t(profileLocales.bio.title)}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {bio
                    ? (
                        <p className={'text-sm leading-relaxed text-foreground'}>
                            {bio}
                        </p>
                    ) : <EmptyState message={t(profileLocales.bio.empty)}/>
                }
            </CardContent>
        </Card>
    )
}
