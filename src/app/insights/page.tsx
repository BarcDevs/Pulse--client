import {InsightsContent} from '@/components/insights/InsightsContent'
import {AppShell} from '@/components/layout/AppShell'
import {Header} from '@/components/layout/Header'

import * as PageSubtitles from '@/constants/pageSubtitlesTexts'

const InsightsPage = () => (
    <AppShell>
        <Header
            title={PageSubtitles.INSIGHTS_PAGE_TITLE}
            subtitle={PageSubtitles.INSIGHTS_PAGE_SUBTITLE}
            actions={
                <div className={'flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium'}>
                    <span className={'h-2 w-2 rounded-full bg-secondary animate-pulse'}/>
                    {PageSubtitles.INSIGHTS_PAGE_BADGE}
                </div>
            }
        />
        <InsightsContent/>
    </AppShell>
)

export default InsightsPage
