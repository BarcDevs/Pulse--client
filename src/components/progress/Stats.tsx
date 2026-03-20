import { Award, Flame, Sparkles,TrendingUp } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'

export function ProgressStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Current Streak */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50">
              <Flame className="size-5 text-[var(--warning)]" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                CURRENT STREAK
              </p>
              <p className="text-2xl font-bold text-[var(--foreground)]">
                12 <span className="text-lg font-normal text-[var(--muted-foreground)]">days</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Badges */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--accent-light)]">
              <Award className="size-5 text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                TOTAL BADGES
              </p>
              <p className="text-2xl font-bold text-[var(--foreground)]">
                5 <span className="text-lg font-normal text-[var(--muted-foreground)]">badges</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Score */}
      <Card className="border-0 bg-[var(--secondary)] text-white shadow-sm">
        <CardContent className="pt-6">
          <Badge className="mb-2 border-0 bg-white/20 text-white">
            WEEKLY MOOD AVERAGE
          </Badge>
          <h3 className="text-xl font-semibold">Stable & Improving</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xs opacity-80">MOOD SCORE</span>
            <span className="font-semibold">6.2 / 10</span>
            <TrendingUp className="ml-auto size-4" />
            <span className="text-sm">trending_flat</span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xs opacity-80">Last week vs. this week</span>
            <span className="ml-auto font-semibold">7.8 / 10</span>
          </div>
        </CardContent>
      </Card>

      {/* AI Summary */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[var(--accent)]" />
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
              AI SUMMARY
            </p>
          </div>
          <p className="mt-2 text-sm text-[var(--foreground)]">
            Your recovery trajectory shows consistent improvement over the past 2 weeks.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
