'use client'

import { useTranslations } from 'next-intl'

import { EmptyState } from '@/components/shared/EmptyState'

import { useUser } from '@/hooks/ui/useUser'

import { cn } from '@/lib/utils'

import {
    profileRecoveryIdentityColorMap,
    profileRecoveryIdentityIconMap
} from '@/constants/mappings/profile'

import { profileLocales } from '@/locales/profileLocales'

export const RecoveryIdentity = () => {
    const t = useTranslations()
    const { user } = useUser()

    const interests = user?.profile?.healthInterests ?? []

    return (
        <div className={'card-base'}>
            <h3 className={'text-lg font-semibold text-foreground mb-2'}>
                {t(profileLocales.recoveryIdentity.title)}
            </h3>
            <p className={'text-sm text-muted-foreground mb-6'}>
                {t(profileLocales.recoveryIdentity.subtitle)}
            </p>

            {interests.length === 0
                ? <EmptyState
                    message={t(profileLocales.recoveryIdentity.empty)}
                /> : (
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
                )
            }

            {/* TODO: show user bio once seeded data is replaced with real user content */}
            {/* TODO: add add/remove health interests editing (getProfileOptions + addInterests/removeInterest) */}
        </div>
    )
}
