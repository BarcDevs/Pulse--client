import { Moon, Quote,Target, TrendingUp } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'

export function ChatSidebar() {
  return (
    <aside className="hidden w-80 shrink-0 border-l border-[var(--border)] bg-[var(--surface-card)] p-4 lg:block">
      <div className="space-y-4">
        {/* Recent Insights */}
        <Card className="border-0 bg-[var(--surface-section)] shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              Recent Insights
            </CardTitle>
            <p className="text-xs text-[var(--muted-foreground)]">
              Analysis from your last 7 days
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Insight 1 */}
            <div className="flex gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                <TrendingUp className="size-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-amber-600">
                  EMOTIONAL TREND
                </p>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  Resilience is Increasing
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {"You've handled 3 stressful triggers this week with positive coping mechanisms."}
                </p>
              </div>
            </div>

            {/* Insight 2 */}
            <div className="flex gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <Moon className="size-4 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-[var(--primary)]">
                  SLEEP QUALITY
                </p>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  Rest improvement needed
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Your average sleep duration has dropped by 45 minutes. Consistency is key.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Milestone */}
        <Card className="border-0 bg-[var(--primary)] text-white shadow-none">
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wider opacity-80">
              NEXT MILESTONE
            </p>
            <h3 className="mt-1 text-lg font-semibold">60 Days Clean</h3>
            <Badge className="mt-2 border-0 bg-white/20 text-white">
              8 days to go
            </Badge>
            <Progress value={87} className="mt-4 h-2 bg-white/20" />
          </CardContent>
        </Card>

        {/* Quote */}
        <div className="rounded-xl bg-[var(--surface-section)] p-4">
          <Quote className="size-6 text-[var(--muted-foreground)]" />
          <p className="mt-2 text-sm italic text-[var(--foreground)]">
            {'"The journey of a thousand miles begins with a single step."'}
          </p>
          <p className="mt-2 text-xs text-[var(--muted-foreground)]">- Lao Tzu</p>
        </div>
      </div>
    </aside>
  )
}
