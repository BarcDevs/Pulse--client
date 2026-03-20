'use client'

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'

const data = [
  { day: 'MON', value: 6 },
  { day: 'TUE', value: 5 },
  { day: 'WED', value: 7 },
  { day: 'THU', value: 9 },
  { day: 'FRI', value: 6 },
  { day: 'SAT', value: 7 },
  { day: 'SUN', value: 8 },
]

export function DashboardWeeklyChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Weekly Recovery Trend</CardTitle>
        <Tabs defaultValue="week" className="w-auto">
          <TabsList className="h-8 bg-[var(--muted)]">
            <TabsTrigger value="week" className="h-6 px-3 text-xs">
              Week
            </TabsTrigger>
            <TabsTrigger value="month" className="h-6 px-3 text-xs">
              Month
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="20%">
              <XAxis
                dataKey="day"
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
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
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
}
