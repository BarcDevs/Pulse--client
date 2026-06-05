'use client'

import { useTranslations } from 'next-intl'

import { EmptyState } from '@/components/shared/EmptyState'

import { useUser } from '@/hooks/ui/useUser'

import { profileLocales } from '@/locales/profileLocales'

import { RecoveryIdentitySkeleton } from './RecoveryIdentitySkeleton'
import { RecoveryInterestChip } from './RecoveryInterestChip'

export const RecoveryInterestList = () => {
    const t = useTranslations()
    const { user, isLoading, isError } = useUser()

    const interests = user?.profile?.healthInterests ?? []

    if (isLoading) return <RecoveryIdentitySkeleton/>
    if (isError || interests.length === 0) return <EmptyState message={t(profileLocales.recoveryIdentity.empty)}/>

    return (
        <div className={'flex flex-wrap gap-3 mb-6'}>
            {interests.map((slug) => (
                <RecoveryInterestChip
                    key={slug}
                    slug={slug}
                />
            ))}
        </div>
    )
}
