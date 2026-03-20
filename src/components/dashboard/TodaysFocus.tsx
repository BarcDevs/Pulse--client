import { Brain } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export function DashboardTodaysFocus() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-[var(--muted-foreground)]">
            {"Today's Focus"}
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-[var(--primary-light)] text-[var(--primary)]"
          >
            RECOMMENDED FOR YOU
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)]">
            <Brain className="size-6 text-[var(--primary)]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              5 mins mindfulness
            </h3>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Lower cortisol levels and improve your mood for the next 4 hours.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
