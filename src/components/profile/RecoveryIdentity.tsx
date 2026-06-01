'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'

import { useUser } from '@/hooks/ui/useUser'

import { cn } from '@/lib/utils'

import {
    profileRecoveryIdentityColorMap,
    profileRecoveryIdentityIconMap
} from '@/constants/mappings/profile'

import { profileLocales } from '@/locales/profileLocales'

import { RecoveryIdentityPicker } from './RecoveryIdentityPicker'

export const RecoveryIdentity = () => {
    const t = useTranslations()
    const { user } = useUser()
    const [isEditing, setIsEditing] = useState(false)

    const interests = user?.profile?.healthInterests ?? []

    return (
        <div className={'card-base'}>
            <div className={'flex-center-between mb-2'}>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {t(profileLocales.recoveryIdentity.title)}
                </h3>
                {!isEditing && (
                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        onClick={() => setIsEditing(true)}
                    >
                        {t(profileLocales.recoveryIdentity.edit)}
                    </Button>
                )}
            </div>
            <p className={'text-sm text-muted-foreground mb-6'}>
                {t(profileLocales.recoveryIdentity.subtitle)}
            </p>

            {isEditing ? (
                <RecoveryIdentityPicker
                    selected={interests}
                    onCloseAction={() => setIsEditing(false)}
                />
            ) : interests.length === 0 ? (
                <EmptyState
                    message={t(profileLocales.recoveryIdentity.empty)}
                />
            ) : (
                <div className={'flex--wrap gap-3 mb-6'}>
                    {interests.map((interest) => {
                        const colorClass =
                            profileRecoveryIdentityColorMap[interest.category]
                            ?? 'bg-muted text-muted-foreground'
                        const IconComponent =
                            profileRecoveryIdentityIconMap[interest.category]

                        return (
                            <div
                                key={interest.id}
                                className={cn(
                                    'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                                    colorClass
                                )}
                            >
                                {IconComponent && (
                                    <IconComponent className={'h-4 w-4'}/>
                                )}
                                <span className={'text-sm font-medium'}>
                                    {interest.name}
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}

        </div>
    )
}
