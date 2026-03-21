'use client'

import {AppHeader} from '@/components/AppHeader'
import {ProfileActivities} from '@/components/profile/Activities'
import {ProfileBasicInfo} from '@/components/profile/BasicInfo'
import {ProfileGoals} from '@/components/profile/Goals'
import {ProfileCard} from '@/components/profile/ProfileCard'
import {RecoveryIdentity} from '@/components/profile/RecoveryIdentity'
import {ProfileSettings} from '@/components/profile/Settings'
import {SidebarProvider} from '@/components/ui/sidebar'

const ProfilePage = () => (
    <SidebarProvider>
        <div className={'flex min-h-screen flex-col'}>
            <AppHeader
                title={'Profile'}
                subtitle={'Manage your recovery identity.'}
            />

            <main className={'flex-1 p-4 md:p-6'}>
                <div className={'mx-auto max-w-6xl'}>
                    <div
                        className={
                            'grid gap-6 ' +
                            'lg:grid-cols-[280px_1fr]'
                        }
                    >
                        <ProfileCard />

                        <div className={'space-y-6'}>
                            <ProfileBasicInfo />
                            <RecoveryIdentity />

                            <div
                                className={
                                    'grid gap-6 ' +
                                    'lg:grid-cols-[1fr_280px]'
                                }
                            >
                                <ProfileActivities />
                                <ProfileGoals />
                            </div>

                            <ProfileSettings />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </SidebarProvider>
)

export {ProfilePage as default}
