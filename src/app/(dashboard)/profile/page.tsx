import type { Metadata } from 'next'

import { ProfilePageContent } from '@/components/profile/ProfilePageContent'

import { createPageMetadata } from '@/config/pagesMetadata'

export const metadata: Metadata = createPageMetadata({
    title: 'Your Profile - HealEase',
    description: 'Manage your HealEase profile and personal recovery information.',
    path: '/profile'
})

const ProfilePage = () => (
    <ProfilePageContent/>
)

export default ProfilePage
