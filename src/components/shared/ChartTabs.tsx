import {
    Tabs,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs'

import {chartTimePeriods} from '@/constants/componentTexts/progressCharts'

type ChartTabsProps = {
    defaultValue?: string
}

export const ChartTabs = ({
    defaultValue = 'weekly'
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
                {chartTimePeriods.daily}
            </TabsTrigger>
            <TabsTrigger
                value={'weekly'}
                className={'h-6 px-3 text-xs'}
            >
                {chartTimePeriods.weekly}
            </TabsTrigger>
            <TabsTrigger
                value={'monthly'}
                className={'h-6 px-3 text-xs'}
            >
                {chartTimePeriods.monthly}
            </TabsTrigger>
        </TabsList>
    </Tabs>
)
