'use client'

import { AppHeader } from '@/components/AppHeader'
import { ProfileActivities } from '@/components/profile/Activities'
import { ProfileBasicInfo } from '@/components/profile/BasicInfo'
import { ProfileGoals } from '@/components/profile/Goals'
import { ProfileCard } from '@/components/profile/ProfileCard'
import { ProfileRecoveryIdentity } from '@/components/profile/RecoveryIdentity'
import { ProfileSettings } from '@/components/profile/Settings'

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader title="Profile" subtitle="Manage your recovery identity." />

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Left Column - Profile Card */}
            <ProfileCard />

            {/* Right Column - Details */}
            <div className="space-y-6">
              <ProfileBasicInfo />
              <ProfileRecoveryIdentity />
              
              <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                <ProfileActivities />
                <ProfileGoals />
              </div>

              <ProfileSettings />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
