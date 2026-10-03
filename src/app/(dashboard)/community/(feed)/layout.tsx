import { LayoutProps } from '@/types/react'

import { CommunityPanel } from '@/components/community/CommunityPanel'

import { CommunityTagProvider } from '@/context/CommunityTagContext'

const CommunityFeedLayout = ({
    children
}: LayoutProps) => (
    <CommunityTagProvider>
        <div className={'flex flex-col items-start gap-6 p-6 lg:flex-row'}>
            <div className={'w-full min-w-0 flex-1'}>
                {children}
            </div>
            <CommunityPanel/>
        </div>
    </CommunityTagProvider>
)

export default CommunityFeedLayout
