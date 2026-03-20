import { Activity, CheckCircle, FileText, Sparkles,TrendingUp } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

const summaryStats = [
  {
    label: 'VITALITY SCORE',
    value: '78',
    trend: 'arrow_upward 3%',
    description: 'Consistent upward trend',
    icon: TrendingUp,
    trendColor: 'text-[var(--secondary)]',
  },
  {
    label: 'ENGAGEMENT',
    value: 'Low',
    trend: 'priority_high Improve',
    description: 'Below baseline in sharing',
    icon: Activity,
    trendColor: 'text-amber-500',
  },
  {
    label: 'SLEEP QUALITY',
    value: '8.2',
    trend: '/10 check_circle Stable',
    description: 'Above the 75th percentile',
    icon: CheckCircle,
    trendColor: 'text-[var(--secondary)]',
  },
  {
    label: 'MOOD STABILITY',
    value: 'High',
    trend: 'trending_up Positive',
    description: 'Improving steadily',
    icon: Sparkles,
    trendColor: 'text-[var(--secondary)]',
  },
]

export function InsightsSummary() {
  return (
    <Card className="mt-6 border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Weekly Trend Summary</CardTitle>
          <p className="text-sm text-[var(--muted-foreground)]">
            Comprehensive overview of your physiological and mental markers.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <FileText className="size-4" />
          Export Report
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-[var(--surface-section)] p-4"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                {stat.label}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--foreground)]">
                  {stat.value}
                </span>
                <span className={`text-sm ${stat.trendColor}`}>{stat.trend}</span>
              </div>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
