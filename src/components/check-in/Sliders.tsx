'use client'

import { Activity,Smile } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/Card'
import { Slider } from '@/components/ui/Slider'

interface CheckInSlidersProps {
  mood: number
  setMood: (value: number) => void
  comfort: number
  setComfort: (value: number) => void
}

export function CheckInSliders({
  mood,
  setMood,
  comfort,
  setComfort,
}: CheckInSlidersProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Mood Slider */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[var(--primary-light)]">
              <Smile className="size-5 text-[var(--primary)]" />
            </div>
            <span className="font-medium text-[var(--foreground)]">
              Current Mood
            </span>
          </div>
          <Slider
            value={[mood]}
            onValueChange={(values) => setMood(values[0])}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="mt-3 flex justify-between text-xs text-[var(--muted-foreground)]">
            <span>STEADY</span>
            <span>RADIANT</span>
          </div>
        </CardContent>
      </Card>

      {/* Physical Comfort Slider */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[var(--secondary-light)]">
              <Activity className="size-5 text-[var(--secondary)]" />
            </div>
            <span className="font-medium text-[var(--foreground)]">
              Physical Comfort
            </span>
          </div>
          <Slider
            value={[comfort]}
            onValueChange={(values) => setComfort(values[0])}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="mt-3 flex justify-between text-xs text-[var(--muted-foreground)]">
            <span>SORENESS</span>
            <span>ENERGETIC</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
