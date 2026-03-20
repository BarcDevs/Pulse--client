'use client'

import { useState } from 'react'

import { Plus, Trophy, X } from 'lucide-react'

import { cn } from '@/lib/utils'

const defaultActivities = [
  'Meditating',
  'Stretching',
  'Sleeping well',
  'Hydrated',
  'Healthy eating',
  'Reading',
]

interface TodaysWinsProps {
  selected: string[]
  onChange: (selected: string[]) => void
}

export function TodaysWins({ selected, onChange }: TodaysWinsProps) {
  const [customActivity, setCustomActivity] = useState('')
  const [showInput, setShowInput] = useState(false)

  const toggleActivity = (activity: string) => {
    if (selected.includes(activity)) {
      onChange(selected.filter((a) => a !== activity))
    } else {
      onChange([...selected, activity])
    }
  }

  const addCustomActivity = () => {
    if (customActivity.trim() && !selected.includes(customActivity.trim())) {
      onChange([...selected, customActivity.trim()])
      setCustomActivity('')
      setShowInput(false)
    }
  }

  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-warning" />
        <span className="font-medium text-foreground">Today&apos;s Wins</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {defaultActivities.map((activity) => (
          <button
            key={activity}
            onClick={() => toggleActivity(activity)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              selected.includes(activity)
                ? 'bg-primary text-primary-foreground'
                : 'bg-[var(--surface-section)] text-muted-foreground hover:bg-[var(--surface-section)]/80'
            )}
          >
            {selected.includes(activity) && <span className="mr-1">✓</span>}
            {activity}
          </button>
        ))}
        
        {/* Custom activities */}
        {selected
          .filter((s) => !defaultActivities.includes(s))
          .map((activity) => (
            <button
              key={activity}
              onClick={() => toggleActivity(activity)}
              className="px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground flex items-center gap-1"
            >
              <span className="mr-1">✓</span>
              {activity}
              <X className="h-3 w-3 ml-1" />
            </button>
          ))}

        {/* Add custom */}
        {showInput ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customActivity}
              onChange={(e) => setCustomActivity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomActivity()}
              placeholder="Type activity..."
              className="px-3 py-2 rounded-full text-sm bg-[var(--surface-section)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            <button
              onClick={addCustomActivity}
              className="p-2 rounded-full bg-primary text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="p-2 rounded-full bg-[var(--surface-section)] text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="px-4 py-2 rounded-full text-sm font-medium border border-dashed border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            Add other...
          </button>
        )}
      </div>
    </div>
  )
}
