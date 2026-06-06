import type { Metadata } from 'next'

import { DashboardPageContent } from '@/components/dashboard/DashboardPageContent'

import { createPageMetadata } from '@/config/pagesMetadata'

export const metadata: Metadata = createPageMetadata({
    title: 'Your Dashboard - HealEase',
    description: 'Track your recovery progress, check in daily, and monitor your wellness journey.',
    path: '/dashboard'
})

const DashboardPage = () => (
    <DashboardPageContent/>
)

export default DashboardPage
