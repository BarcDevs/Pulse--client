'use client'

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
    CHART_DAYS,
} from '@/constants/communityMockTexts'
import {
    DASHBOARD_WEEKLY_CHART_MONTH,
    DASHBOARD_WEEKLY_CHART_TITLE,
    DASHBOARD_WEEKLY_CHART_WEEK,
} from '@/constants/dashboardTexts'

const data = [
  { day: CHART_DAYS[0], value: 6 },
  { day: CHART_DAYS[1], value: 5 },
  { day: CHART_DAYS[2], value: 7 },
  { day: CHART_DAYS[3], value: 9 },
  { day: CHART_DAYS[4], value: 6 },
  { day: CHART_DAYS[5], value: 7 },
  { day: CHART_DAYS[6], value: 8 },
]

export const DashboardWeeklyChart = () => (
  <Card className={'border-0 shadow-sm'}>
    <CardHeader className={'flex flex-row items-center justify-between pb-2'}>
      <CardTitle className={'text-lg font-semibold'}>{DASHBOARD_WEEKLY_CHART_TITLE}</CardTitle>
      <Tabs defaultValue={'week'} className={'w-auto'}>
        <TabsList className={'h-8 bg-muted'}>
          <TabsTrigger value={'week'} className={'h-6 px-3 text-xs'}>
            {DASHBOARD_WEEKLY_CHART_WEEK}
          </TabsTrigger>
          <TabsTrigger value={'month'} className={'h-6 px-3 text-xs'}>
            {DASHBOARD_WEEKLY_CHART_MONTH}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </CardHeader>
    <CardContent>
      <div className={'h-[240px] w-full'}>
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <BarChart data={data} barCategoryGap={'20%'}>
            <XAxis
              dataKey={'day'}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            />
            <YAxis
              domain={[0, 10]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              width={30}
            />
            <Bar dataKey={'value'} radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.day === 'THU'
                      ? 'var(--primary)'
                      : 'var(--primary-light)'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
)
