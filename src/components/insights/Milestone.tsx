import { Trophy } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/Card'

export function InsightsMilestone() {
  return (
    <Card className="border-0 bg-[var(--accent)] text-white shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Trophy className="size-8" />
          <div>
            <h3 className="text-xl font-semibold">Milestone Reached!</h3>
            <p className="mt-2 text-white/90">
              {"You've logged 10 consecutive days! Consistency is the foundation of lasting recovery."}
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-white/60">
              GOLD STREAK LEVEL 1
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
