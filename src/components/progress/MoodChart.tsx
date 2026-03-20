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
  { date: 'Mon', actual: 5, target: 6 },
  { date: 'Tue', actual: 6, target: 6 },
  { date: 'Wed', actual: 5.5, target: 6 },
  { date: 'Thu', actual: 7, target: 6 },
  { date: 'Fri', actual: 6.5, target: 6 },
  { date: 'Sat', actual: 8, target: 6 },
  { date: 'Sun', actual: 7.5, target: 6 },
]

export function ProgressMoodChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Mood Trend</CardTitle>
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
          Daily average mood score
        </p>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
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
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#moodGradient)"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="var(--muted-foreground)"
                strokeDasharray="5 5"
                strokeWidth={1}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-[var(--primary)]" />
            <span className="text-sm text-[var(--muted-foreground)]">Actual Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-4 border-t-2 border-dashed border-[var(--muted-foreground)]" />
            <span className="text-sm text-[var(--muted-foreground)]">Weekly Target</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
