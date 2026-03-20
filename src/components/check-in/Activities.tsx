'use client'

import { useState } from 'react'

import { Plus, Trophy } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

import { cn } from '@/lib/utils'

const defaultActivities = [
  'Meditating',
  'Stretching',
  'Sleeping well',
  'Hydrated',
  'Healthy eating',
  'Reading',
]

interface CheckInActivitiesProps {
  selectedActivities: string[]
  setSelectedActivities: (activities: string[]) => void
}

export function CheckInActivities({
  selectedActivities,
  setSelectedActivities,
}: CheckInActivitiesProps) {
  const [customActivity, setCustomActivity] = useState('')

  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity))
    } else {
      setSelectedActivities([...selectedActivities, activity])
    }
  }

  const addCustomActivity = () => {
    if (customActivity.trim() && !selectedActivities.includes(customActivity.trim())) {
      setSelectedActivities([...selectedActivities, customActivity.trim()])
      setCustomActivity('')
    }
  }

  return (
    <Card className="mt-6 border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="size-5 text-[var(--warning)]" />
          <CardTitle className="text-lg font-semibold">{"Today's Wins"}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {defaultActivities.map((activity) => (
            <button
              key={activity}
              onClick={() => toggleActivity(activity)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                selectedActivities.includes(activity)
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80'
              )}
            >
              {selectedActivities.includes(activity) && (
                <span className="mr-1">+</span>
              )}
              {activity}
            </button>
          ))}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Add other..."
              value={customActivity}
              onChange={(e) => setCustomActivity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomActivity()}
              className="h-9 w-32 rounded-full border-[var(--border)] bg-[var(--surface-card)]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
