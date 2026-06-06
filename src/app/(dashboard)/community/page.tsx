import type { Metadata } from 'next'

import { CommunityPageContent } from '@/components/community/CommunityPageContent'

import { createPageMetadata } from '@/config/pagesMetadata'

export const metadata: Metadata = createPageMetadata({
    title: 'Community - Support & Connection - HealEase',
    description: 'Connect with others on their recovery journey, share experiences, and find support in our caring community.',
    path: '/community'
})

const CommunityPage = () => (
    <CommunityPageContent/>
)

export default CommunityPage
