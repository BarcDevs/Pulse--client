'use client'

import {InsightsCard} from './InsightsCard'
import {QuoteCard} from './QuoteCard'
import {SidebarMilestoneCard} from './SidebarMilestoneCard'

export const ChatSection = () => (
    <div className={'space-y-4'}>
        <InsightsCard/>
        <SidebarMilestoneCard/>
        <QuoteCard/>
    </div>
)