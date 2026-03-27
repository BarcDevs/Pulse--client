import {
    Tabs,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs'

import {CHART_TIME_PERIODS} from '@/constants/sharedComponentTexts'

type ChartTabsProps = {
    defaultValue?: string
}

export const ChartTabs = ({
    defaultValue = 'weekly',
}: ChartTabsProps) => (
    <Tabs
        defaultValue={defaultValue}
        className={'w-auto'}
    >
        <TabsList className={'h-8 bg-muted'}>
            <TabsTrigger
                value={'daily'}
                className={'h-6 px-3 text-xs'}
            >
                {CHART_TIME_PERIODS.daily}
            </TabsTrigger>
            <TabsTrigger
                value={'weekly'}
                className={'h-6 px-3 text-xs'}
            >
                {CHART_TIME_PERIODS.weekly}
            </TabsTrigger>
            <TabsTrigger
                value={'monthly'}
                className={'h-6 px-3 text-xs'}
            >
                {CHART_TIME_PERIODS.monthly}
            </TabsTrigger>
        </TabsList>
    </Tabs>
)
