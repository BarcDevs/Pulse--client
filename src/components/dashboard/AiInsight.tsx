import { Sparkles } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export function DashboardAIInsight() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-[var(--accent)]" />
          <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
            AI INSIGHT
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-2 border-[var(--primary)] pl-4 italic text-[var(--foreground)]">
          {'"Your mood is 20% higher on days you stretch. Consider adding a short session tonight."'}
        </blockquote>
      </CardContent>
    </Card>
  )
}
