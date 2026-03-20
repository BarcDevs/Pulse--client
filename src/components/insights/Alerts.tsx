import { AlertTriangle, Lightbulb } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export function InsightsAlerts() {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {/* Pain Trend Alert */}
      <Card className="border-0 border-l-4 border-l-amber-500 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
              <AlertTriangle className="size-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)]">
                Pain Trend Alert
              </h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Slightly higher pain levels recorded today compared to your 7-day average. Your sleep quality was also 12% lower last night.
              </p>
              <div className="mt-3 flex gap-2">
                <Badge className="bg-amber-100 text-amber-700">
                  ATTENTION REQUIRED
                </Badge>
                <Button
                  variant="link"
                  className="h-auto p-0 text-[var(--primary)]"
                >
                  Update Journal
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actionable Step */}
      <Card className="border-0 border-l-4 border-l-[var(--secondary)] shadow-sm">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--secondary-light)]">
              <Lightbulb className="size-5 text-[var(--secondary)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)]">
                Actionable Step
              </h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Try 10 minutes of restorative yoga today to manage pain and improve evening relaxation before your next sleep cycle.
              </p>
              <Button
                size="sm"
                className="mt-3 bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]/90"
              >
                Start Session Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
