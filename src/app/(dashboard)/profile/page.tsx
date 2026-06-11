import type { Metadata } from 'next'

import { ProfilePageContent } from '@/components/profile/ProfilePageContent'

import { appSettings } from '@/config/appSettings'
import { createPageMetadata } from '@/config/pagesMetadata'

export const metadata: Metadata = createPageMetadata({
    title: `Your Profile - ${appSettings.brandName}`,
    description: `Manage your ${appSettings.brandName} profile and personal recovery information.`,
    path: '/profile'
})

const ProfilePage = () => (
    <ProfilePageContent/>
)

export default ProfilePage
