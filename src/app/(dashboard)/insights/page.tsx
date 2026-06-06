import type { Metadata } from 'next'

import { InsightsPageContent }
    from '@/components/insights/InsightsPageContent'

import { FEATURES } from '@/config/features'
import { createPageMetadata } from '@/config/pagesMetadata'

export const metadata: Metadata = FEATURES.insights
    ? createPageMetadata({
        title: 'Your Insights - HealEase',
        description: 'Discover AI-powered insights about your recovery patterns and wellness trends.',
        path: '/insights'
    }) : {}

const InsightsPage = () => (
    <InsightsPageContent/>
)

export default InsightsPage
