'use client'

import { useTranslations } from 'next-intl'

import { SavingBanner } from '@/components/shared/SavingBanner'

import { ProfileEditProvider, useProfileEditContext } from '@/context/ProfileEditContext'

import { profileLocales } from '@/locales/profileLocales'

import { ProfileBio } from './bio/ProfileBio'
import { ActiveGoals } from './goals/ActiveGoals'
import { ProfileCard } from './info/ProfileCard'
import { ProfileBasicInfo } from './settings/BasicInfo'
import { DailyActivityPreferences } from './settings/DailyActivityPreferences'
import { SystemPrivacy } from './settings/SystemPrivacy'
import { EditBanner } from './EditBanner'
import { RecoveryIdentity } from './RecoveryIdentity'

const ProfileContent = () => {
    const t = useTranslations()
    const { isSaving } = useProfileEditContext()

    return (
        <div className={'p-6 space-y-6'}>
            {isSaving && (
                <SavingBanner message={t(profileLocales.savingMessage)}/>
            )}

            <EditBanner/>

            <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
                <ProfileCard/>
                <div className={'lg:col-span-2'}>
                    <ProfileBasicInfo/>
                </div>
            </div>

            <ProfileBio/>

            <RecoveryIdentity/>

            <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
                <div className={'lg:col-span-2 h-full'}>
                    <DailyActivityPreferences/>
                </div>
                <ActiveGoals/>
            </div>

            <SystemPrivacy/>
        </div>
    )
}

export const ProfilePageContent = () => (
    <ProfileEditProvider>
        <ProfileContent/>
    </ProfileEditProvider>
)
