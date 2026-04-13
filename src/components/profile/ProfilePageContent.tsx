import { FEATURES } from '@/config/features'

import { ActiveGoals } from './goals/ActiveGoals'
import { ProfileCard } from './info/ProfileCard'
import { ProfileBasicInfo } from './settings/BasicInfo'
import { DailyActivityPreferences } from './settings/DailyActivityPreferences'
import { SystemPrivacy } from './settings/SystemPrivacy'
import { RecoveryIdentity } from './RecoveryIdentity'

export const ProfilePageContent = () => (
    <div className={'p-6 space-y-6'}>
        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
            <ProfileCard/>
            <div className={'lg:col-span-2'}>
                <ProfileBasicInfo/>
            </div>
        </div>

        <RecoveryIdentity/>

        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
            <div className={'lg:col-span-2'}>
                <DailyActivityPreferences/>
            </div>
            {FEATURES.recoveryGoals && (
                <ActiveGoals/>
            )}
        </div>

        {FEATURES.profilePreferences && (
            <SystemPrivacy/>
        )}
    </div>
)
