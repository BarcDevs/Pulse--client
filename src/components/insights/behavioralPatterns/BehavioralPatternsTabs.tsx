import { useTranslations } from 'next-intl'

import type { SetState } from '@/types/react'

import { TabButton } from '@/components/shared/buttons/TabButton'

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
            <TabButton
                variant={'segmented'}
                isActive={activeTab === '7days'}
                onClick={handleSevenDaysClick}
            >
                {t(insightsLocales.behavioralPatterns.tabs.sevenDays)}
            </TabButton>
            <TabButton
                variant={'segmented'}
                isActive={activeTab === '30days'}
                onClick={handleThirtyDaysClick}
            >
                {t(insightsLocales.behavioralPatterns.tabs.thirtyDays)}
            </TabButton>
        </div>
    )
}
