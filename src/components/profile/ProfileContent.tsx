'use client'

import { ActiveGoals } from './ActiveGoals'
import { ProfileBasicInfo } from './BasicInfo'
import { DailyActivityPreferences } from './DailyActivityPreferences'
import { ProfileCard } from './ProfileCard'
import { RecoveryIdentity } from './RecoveryIdentity'
import { SystemPrivacy } from './SystemPrivacy'

export const ProfileContent = () => (
  <div className={'p-6 space-y-6'}>
    {/* Top Row - User Card and Basic Info */}
    <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
      <ProfileCard />
      <div className={'lg:col-span-2'}>
        <ProfileBasicInfo />
      </div>
    </div>

    {/* Recovery Identity */}
    <RecoveryIdentity />

    {/* Bottom Row - Preferences and Goals */}
    <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
      <div className={'lg:col-span-2'}>
        <DailyActivityPreferences />
      </div>
      <div>
        <ActiveGoals />
      </div>
    </div>

    {/* System & Privacy */}
    <SystemPrivacy />
  </div>
)
