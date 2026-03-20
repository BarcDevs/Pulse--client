'use client'

import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'

const data = [
  { date: 'Mon', actual: 6 },
  { date: 'Tue', actual: 5 },
  { date: 'Wed', actual: 5.5 },
  { date: 'Thu', actual: 4 },
  { date: 'Fri', actual: 3.5 },
  { date: 'Sat', actual: 3 },
  { date: 'Sun', actual: 3 },
]

export function ProgressPainChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Pain Intensity</CardTitle>
        <Tabs defaultValue="weekly" className="w-auto">
          <TabsList className="h-8 bg-[var(--muted)]">
            <TabsTrigger value="daily" className="h-6 px-3 text-xs">
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" className="h-6 px-3 text-xs">
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" className="h-6 px-3 text-xs">
              Monthly
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-[var(--muted-foreground)]">
          Tracking physical symptoms over time
        </p>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="painGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
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
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="var(--secondary)"
                strokeWidth={2}
                fill="url(#painGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="size-3 rounded-full bg-[var(--secondary)]" />
          <span className="text-sm text-[var(--muted-foreground)]">Pain Level (lower is better)</span>
        </div>
      </CardContent>
    </Card>
  )
}
