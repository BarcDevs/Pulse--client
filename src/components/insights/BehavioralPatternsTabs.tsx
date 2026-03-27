import {Button} from '@/components/ui/button'

import {cn} from '@/lib/utils'

import {insightsPageTexts}
    from '@/constants/componentTexts/insightsComponent'

type BehavioralPatternsTabsProps = {
    activeTab: '7days' | '30days'
// todo: make a type
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
            {insightsPageTexts.behavioralPatterns.tabs.sevenDays}
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
            {insightsPageTexts.behavioralPatterns.tabs.thirtyDays}
        </Button>
    </div>
)
