'use client'

import { ActiveGoals } from './ActiveGoals'
import { BasicInformation } from './BasicInformation'
import { DailyActivityPreferences } from './DailyActivityPreferences'
import { RecoveryIdentity } from './RecoveryIdentity'
import { SystemPrivacy } from './SystemPrivacy'
import { UserProfileCard } from './UserProfileCard'

export function ProfileContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Top Row - User Card and Basic Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserProfileCard />
        <div className="lg:col-span-2">
          <BasicInformation />
        </div>
      </div>

      {/* Recovery Identity */}
      <RecoveryIdentity />

      {/* Bottom Row - Preferences and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
}
