'use client'

import { useTranslations } from 'next-intl'

import { EmptyState } from '@/components/shared/EmptyState'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

import { useUser } from '@/hooks/ui/useUser'

import { cn } from '@/lib/utils'

import profileFormConfig from '@/config/schema/profileForm'

import { useProfileEditContext } from '@/context/ProfileEditContext'

import { profileLocales } from '@/locales/profileLocales'

import { ProfileBioSkeleton } from './ProfileBioSkeleton'

export const ProfileBio = () => {
    const t = useTranslations()
    const { user, isLoading } = useUser()
    const {
        isEditing,
        profileFields,
        updateProfileField
    } = useProfileEditContext()

    if (isLoading) return <ProfileBioSkeleton/>

    const bio = user?.profile?.bio
    const bioValue = profileFields.bio

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader>
                <div className={'flex items-center justify-between'}>
                    <CardTitle className={'text-lg font-semibold'}>
                        {t(profileLocales.bio.title)}
                    </CardTitle>
                    {isEditing && (
                        <span className={cn(
                            'text-xs',
                            bioValue.length > profileFormConfig.bio.maxLength * 0.9
                                ? 'text-destructive'
                                : 'text-muted-foreground'
                        )}>
                            {`${bioValue.length} / ${profileFormConfig.bio.maxLength}`}
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <Textarea
                        value={bioValue}
                        rows={4}
                        placeholder={t(profileLocales.bio.placeholder)}
                        className={'resize-none bg-muted'}
                        onChange={(e) => updateProfileField('bio', e.target.value)}
                    />
                ) : bio ? (
                    <p className={'text-sm leading-relaxed text-foreground'}>
                        {bio}
                    </p>
                ) : (
                    <EmptyState message={t(profileLocales.bio.empty)}/>
                )}
            </CardContent>
        </Card>
    )
}
