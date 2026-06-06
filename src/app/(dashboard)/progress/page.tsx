import type { Metadata } from 'next'

import { ProgressPageContent } from '@/components/progress/ProgressPageContent'

import { createPageMetadata } from '@/config/pagesMetadata'

export const metadata: Metadata = createPageMetadata({
    title: 'Your Progress - HealEase',
    description: 'Visualize your recovery progress with milestones, timelines, and meaningful insights.',
    path: '/progress'
})

const ProgressPage = () => (
    <ProgressPageContent/>
)

export default ProgressPage
