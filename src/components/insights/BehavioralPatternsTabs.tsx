import {Button} from '@/components/ui/button'

import {cn} from '@/lib/utils'

import * as InsightsComponentTexts from '@/constants/insightsComponentTexts'

type BehavioralPatternsTabsProps = {
    activeTab: '7days' | '30days'
    onTabChange: (tab: '7days' | '30days') => void
}

export const BehavioralPatternsTabs = ({
    activeTab,
    onTabChange,
}: BehavioralPatternsTabsProps) => (
    <div className={'flex gap-1 rounded-lg bg-surface-section p-1'}>
        <Button
            onClick={() => onTabChange('7days')}
            variant={
                activeTab === '7days' ?
                    'default' :
                    'ghost'
            }
            size={'sm'}
            className={cn(
                'rounded-md text-xs font-medium',
                activeTab === '7days' ?
                    'bg-surface-card text-foreground shadow-sm' :
                    'text-muted-foreground hover:text-foreground'
            )}
        >
            {InsightsComponentTexts.INSIGHTS_BEHAVIORAL_PATTERNS_TAB_7DAYS}
        </Button>
        <Button
            onClick={() => onTabChange('30days')}
            variant={
                activeTab === '30days' ?
                    'default' :
                    'ghost'
            }
            size={'sm'}
            className={cn(
                'rounded-md text-xs font-medium',
                activeTab === '30days' ?
                    'bg-primary text-primary-foreground' :
                    'text-muted-foreground hover:text-foreground'
            )}
        >
            {InsightsComponentTexts.INSIGHTS_BEHAVIORAL_PATTERNS_TAB_30DAYS}
        </Button>
    </div>
)
