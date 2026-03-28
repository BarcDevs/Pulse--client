import {Button} from '@/components/ui/button'

import {cn} from '@/lib/utils'

import {insightsPageTexts}
    from '@/constants/componentTexts/insightsComponent'

type BehavioralPatternsTabsProps = {
    activeTab: '7days' | '30days'
    // todo: make a type
    onTabChangeAction: (tab: '7days' | '30days') => void
}

export const BehavioralPatternsTabs = ({
    activeTab,
    onTabChangeAction
}: BehavioralPatternsTabsProps) => {
    const handleSevenDaysClick = () =>
        onTabChangeAction('7days')

    const handleThirtyDaysClick = () =>
        onTabChangeAction('30days')

    return (
        <div className={'flex gap-1 rounded-lg bg-surface-section p-1'}>
            <Button
                onClick={handleSevenDaysClick}
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
                onClick={handleThirtyDaysClick}
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
}
