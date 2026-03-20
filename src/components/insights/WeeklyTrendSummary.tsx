'use client'

import { CheckCircle,FileText, Minus, TrendingDown, TrendingUp } from 'lucide-react'

import { Button } from '@/components/ui/Button'

const metrics = [
  {
    label: 'Vitality Score',
    value: '78',
    trend: 'arrow_upward 3%',
    trendType: 'positive',
    description: 'Composite overall health',
  },
  {
    label: 'Engagement',
    value: 'Low',
    trend: 'priority_high/Increase',
    trendType: 'warning',
    description: 'Session engagement is waning',
  },
  {
    label: 'Sleep Quality',
    value: '8.2',
    trend: 'check_circle/Stable',
    trendType: 'neutral',
    description: 'hrs; the 95th percentile',
  },
  {
    label: 'Anxiety Clarity',
    value: 'High',
    trend: 'trending_up/New',
    trendType: 'positive',
    description: 'Improving and stabilizing',
  },
]

export function WeeklyTrendSummary() {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Weekly Trend Summary</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive overview of your physiological and mental markers
          </p>
        </div>
        <Button variant="outline" size="sm" className="text-muted-foreground">
          <FileText className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {metric.label}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">{metric.value}</span>
              <span className={`flex items-center gap-1 text-xs font-medium ${
                metric.trendType === 'positive' ? 'text-secondary' :
                metric.trendType === 'warning' ? 'text-warning' :
                'text-muted-foreground'
              }`}>
                {metric.trendType === 'positive' && <TrendingUp className="h-3 w-3" />}
                {metric.trendType === 'warning' && <TrendingDown className="h-3 w-3" />}
                {metric.trendType === 'neutral' && <CheckCircle className="h-3 w-3" />}
                {metric.trend.split('/')[0]}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
