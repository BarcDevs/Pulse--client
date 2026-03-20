'use client'

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'

const socialData = [
  { day: 'Mon', value: 4 },
  { day: 'Tue', value: 6 },
  { day: 'Wed', value: 3 },
  { day: 'Thu', value: 7 },
  { day: 'Fri', value: 5 },
]

export function InsightsPatterns() {
  return (
    <Card className="mt-6 border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Behavioral Patterns</CardTitle>
        <Tabs defaultValue="30" className="w-auto">
          <TabsList className="h-8 bg-[var(--muted)]">
            <TabsTrigger value="7" className="h-6 px-3 text-xs">
              7 Days
            </TabsTrigger>
            <TabsTrigger value="30" className="h-6 px-3 text-xs">
              30 Days
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Social Interaction */}
          <div className="rounded-xl bg-[var(--surface-section)] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
              CORRELATION
            </p>
            <h4 className="mt-1 font-semibold text-[var(--foreground)]">
              Social Interaction vs. Stress
            </h4>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              You report 22% lower stress levels on days when you participate in community group chats.
            </p>
            <div className="mt-4 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={socialData}>
                  <XAxis dataKey="day" hide />
                  <YAxis hide />
                  <Bar
                    dataKey="value"
                    fill="var(--primary)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Morning Routine */}
          <div className="rounded-xl bg-[var(--surface-section)] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
              OBSERVATION
            </p>
            <h4 className="mt-1 font-semibold text-[var(--foreground)]">
              Morning Routine Impact
            </h4>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Completing a Daily Check-In before 9:00 AM leads to a 30% higher chance of reaching all daily recovery goals.
            </p>
            <div className="mt-4">
              <div className="text-3xl font-bold text-[var(--primary)]">82%</div>
              <p className="text-xs text-[var(--muted-foreground)]">
                SUCCESS RATE WHEN DAILY
              </p>
            </div>
          </div>

          {/* Projected Recovery */}
          <div className="rounded-xl bg-[var(--primary)] p-4 text-white">
            <p className="text-xs font-medium uppercase tracking-wider opacity-80">
              AI PREDICTION
            </p>
            <h4 className="mt-1 font-semibold">Projected Recovery Path</h4>
            <p className="mt-2 text-sm opacity-90">
              If current adherence maintains, you are on track to increase your range of motion by 8% next week.
            </p>
            <Badge className="mt-4 border-0 bg-white/20 text-white">
              HIGH CONFIDENCE ANALYTICS
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
