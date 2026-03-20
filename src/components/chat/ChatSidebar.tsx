'use client'

import { Moon, Quote,Target, TrendingUp } from 'lucide-react'

export function ChatSidebar() {
  return (
    <div className="space-y-6">
      {/* Recent Insights */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Recent Insights</h3>
        <p className="text-xs text-muted-foreground mb-3">Analyzed from your last 7 days</p>
        
        <div className="space-y-4">
          {/* Resilience */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              <TrendingUp className="h-4 w-4 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Emotional Trend
              </p>
              <h4 className="text-sm font-medium text-foreground mt-0.5">
                Resilience is increasing
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                You&apos;ve handled 3 stressful triggers this week with positive coping mechanisms.
              </p>
            </div>
          </div>

          {/* Sleep */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Moon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Sleep Quality
              </p>
              <h4 className="text-sm font-medium text-foreground mt-0.5">
                Rest improvement needed
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Your average sleep duration has dropped by 45 minutes. Consistency is key.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Milestone */}
      <div className="rounded-xl bg-primary p-4 text-primary-foreground">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wider opacity-80">
            Next Milestone
          </span>
        </div>
        <h4 className="text-lg font-semibold">60 Days Clean</h4>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-white rounded-full" />
          </div>
          <span className="text-xs">8 days to go</span>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-start gap-2">
          <Quote className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              &quot;The journey of a thousand miles begins with a single step.&quot;
            </p>
            <p className="text-xs text-muted-foreground mt-2">- Lao Tzu</p>
          </div>
        </div>
      </div>
    </div>
  )
}
