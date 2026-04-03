'use client'

import {useState} from 'react'

import {DataNotification} from '@/components/shared/notifications/DataNotification'
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
    const isIncompleteWeek = chartData.length < 7
        && period === 'week'

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'flex flex-row items-center justify-between pb-2'}>
                <CardTitle className={'text-lg font-semibold'}>
                    {dashboardPageTexts.historyChart.title}
                </CardTitle>
                <Tabs
                    value={period}
                    onValueChange={(value) =>
                        !isIncompleteWeek &&
                        setPeriod(value as Period)
                    }
                    className={'w-auto'}
                >
                    <TabsList
                        className={
                            isIncompleteWeek ?
                                'h-8 bg-muted opacity-50 cursor-not-allowed' :
                                'h-8 bg-muted'
                        }
                    >
                        <TabsTrigger
                            value={'week'}
                            className={'h-6 px-3 text-xs cursor-pointer'}
                            disabled={isIncompleteWeek}
                        >
                            {dashboardPageTexts.historyChart.week}
                        </TabsTrigger>
                        <TabsTrigger
                            value={'month'}
                            className={'h-6 px-3 text-xs cursor-pointer'}
                            disabled={isIncompleteWeek}
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
                    <div className={'relative'}>
                        <HistoryChartContent
                            reorderedData={reorderedData}
                            hoveredIndex={
                                isIncompleteWeek ?
                                    null :
                                    hoveredIndex
                            }
                            setHoveredIndexAction={
                                isIncompleteWeek ?
                                    () => {} :
                                    setHoveredIndex
                            }
                        />
                        {isIncompleteWeek && (
                            <DataNotification
                                message={dashboardPageTexts.historyChart.incompleteWeek}
                            />
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
