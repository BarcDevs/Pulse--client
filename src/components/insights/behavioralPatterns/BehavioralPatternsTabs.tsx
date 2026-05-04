import { useTranslations } from 'next-intl'

import type { SetState } from '@/types/react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { insightsLocales } from '@/locales/insightsLocales'

type BehavioralPatternsTabsProps = {
    activeTab: '7days' | '30days'
    onTabChangeAction: SetState<'7days' | '30days'>
}

export const BehavioralPatternsTabs = ({
    activeTab,
    onTabChangeAction
}: BehavioralPatternsTabsProps) => {
    const t = useTranslations()
    const handleSevenDaysClick = () =>
        onTabChangeAction('7days')

    const handleThirtyDaysClick = () =>
        onTabChangeAction('30days')

    return (
        <div className={'flex gap-1 rounded-lg bg-surface-section p-1'}>
            <Button
                onClick={handleSevenDaysClick}
                variant={
                    activeTab === '7days'
                        ? 'default'
                        : 'ghost'
                }
                size={'sm'}
                className={cn(
                    'rounded-md text-xs font-medium',
                    activeTab === '7days'
                        ? 'bg-surface-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                )}
            >
                {t(insightsLocales.behavioralPatterns.tabs.sevenDays)}
            </Button>
            <Button
                onClick={handleThirtyDaysClick}
                variant={
                    activeTab === '30days'
                        ? 'default'
                        : 'ghost'
                }
                size={'sm'}
                className={cn(
                    'rounded-md text-xs font-medium',
                    activeTab === '30days'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                )}
            >
                {t(insightsLocales.behavioralPatterns.tabs.thirtyDays)}
            </Button>
        </div>
    )
}
