import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export function InsightsHeader() {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="pt-6">
        <Badge className="mb-4 border-0 bg-red-100 text-red-600">
          CRITICAL INSIGHT
        </Badge>
        <h2 className="text-2xl font-semibold text-[var(--foreground)] text-balance">
          Your mood improves by 15% on days including mobility stretching.
        </h2>
        <p className="mt-3 text-[var(--muted-foreground)]">
          Our analysis shows a direct correlation between your 8 AM stretching routine and peak afternoon energy levels.
        </p>
        <div className="mt-6 flex gap-3">
          <Button className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
            Schedule Stretch
          </Button>
          <Button variant="outline">View Data Correlation</Button>
        </div>
      </CardContent>
    </Card>
  )
}
