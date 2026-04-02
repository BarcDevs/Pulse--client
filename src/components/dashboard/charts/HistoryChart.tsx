'use client'

import {useState} from 'react'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Tabs,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs'

import {useCheckInHistory} from '@/hooks/queries/useCheckInHistory'
import {useDirection} from '@/hooks/useDirection'

import {reverseChartData} from '@/utils/chart'

import {dashboardPageTexts} from '@/constants/componentTexts/dashboard'

import {HistoryChartContent} from './HistoryChartContent'

type Period = 'week' | 'month'

export const DashboardHistoryChart = () => {
    const dir = useDirection()
    const [period, setPeriod] = useState<Period>(
        'week'
    )
    const [hoveredIndex, setHoveredIndex] =
        useState<number | null>(null)

    const daysToShow = period === 'week' ? 7 : 30

    const {
        data: historyResponse,
        isLoading
    } = useCheckInHistory(daysToShow)

    const chartData = historyResponse?.data ?? []
    const reorderedData = dir === 'ltr' ?
        reverseChartData(chartData) :
        chartData

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'flex flex-row items-center justify-between pb-2'}>
                <CardTitle className={'text-lg font-semibold'}>
                    {dashboardPageTexts.historyChart.title}
                </CardTitle>
                <Tabs
                    value={period}
                    onValueChange={(value) =>
                        setPeriod(value as Period)
                    }
                    className={'w-auto'}
                >
                    <TabsList className={'h-8 bg-muted'}>
                        <TabsTrigger
                            value={'week'}
                            className={'h-6 px-3 text-xs cursor-pointer'}
                        >
                            {dashboardPageTexts.historyChart.week}
                        </TabsTrigger>
                        <TabsTrigger
                            value={'month'}
                            className={'h-6 px-3 text-xs cursor-pointer'}
                        >
                            {dashboardPageTexts.historyChart.month}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                {/* todo: add skeleton loader*/}
                {isLoading ? (
                    <div className={'h-60 w-full flex items-center justify-center text-muted-foreground'}>
                        Loading...
                    </div>
                ) : (
                    <HistoryChartContent
                        reorderedData={reorderedData}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                    />
                )}
            </CardContent>
        </Card>
    )
}
