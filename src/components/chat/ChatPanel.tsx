import {InsightQuoteCard} from './InsightQuoteCard'
import {NextMilestoneCard} from './NextMilestoneCard'
import {RecentInsightsCard} from './RecentInsightsCard'

export const ChatPanel = () => (
    <aside className={'hidden w-80 shrink-0 border-l border-border bg-surface-card p-4 lg:block'}>
        <div className={'space-y-4'}>
            <RecentInsightsCard/>
            <NextMilestoneCard/>
            <InsightQuoteCard/>
        </div>
    </aside>
)
