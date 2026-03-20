import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'

const goals = [
  { label: 'PHYSIO THERAPY', progress: 80 },
  { label: 'DAILY MEDITATION', progress: 65 },
  { label: 'SLEEP HYGIENE', progress: 40 },
]

export function ProfileGoals() {
  return (
    <Card className="border-0 bg-[var(--primary)] text-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Active Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                {goal.label}
              </span>
              <span className="font-medium">{goal.progress}%</span>
            </div>
            <Progress
              value={goal.progress}
              className="mt-2 h-2 bg-white/20 [&>[data-slot=progress-indicator]]:bg-white"
            />
          </div>
        ))}

        <Button
          variant="outline"
          className="mt-4 w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
        >
          View Roadmap
        </Button>
      </CardContent>
    </Card>
  )
}
