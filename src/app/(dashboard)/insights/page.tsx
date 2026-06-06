import type { Metadata } from 'next'

import { InsightsPageContent }
    from '@/components/insights/InsightsPageContent'

import { appSettings } from '@/config/appSettings'
import { FEATURES } from '@/config/features'
import { createPageMetadata } from '@/config/pagesMetadata'

export const metadata: Metadata = FEATURES.insights
    ? createPageMetadata({
        title: `Your Insights - ${appSettings.brandName}`,
        description: 'Discover AI-powered insights about your recovery patterns and wellness trends.',
        path: '/insights'
    }) : {}

const InsightsPage = () => (
    <InsightsPageContent/>
)

export default InsightsPage
