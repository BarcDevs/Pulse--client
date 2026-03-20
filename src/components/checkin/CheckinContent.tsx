'use client'

import { useState } from 'react'

import { CheckCircle, Quote } from 'lucide-react'

import { Button } from '@/components/ui/Button'

import { ComfortSlider } from './ComfortSlider'
import { JournalEntry } from './JournalEntry'
import { MoodSlider } from './MoodSlider'
import { TodaysWins } from './TodaysWins'

export function CheckInContent() {
  const [mood, setMood] = useState(50)
  const [comfort, setComfort] = useState(50)
  const [wins, setWins] = useState<string[]>(['Meditating', 'Hydrated'])
  const [journal, setJournal] = useState('')

  const handleSubmit = () => {
    console.log({ mood, comfort, wins, journal })
    // Handle submission
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Daily Check-In</h1>
        <p className="text-muted-foreground mt-2">
          Take a moment to center yourself and log your progress.
        </p>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <MoodSlider value={mood} onChange={setMood} />
        <ComfortSlider value={comfort} onChange={setComfort} />
      </div>

      {/* Today's Wins */}
      <TodaysWins selected={wins} onChange={setWins} />

      {/* Journal Entry */}
      <JournalEntry value={journal} onChange={setJournal} />

      {/* Submit Button */}
      <div className="mt-8 text-center">
        <Button 
          onClick={handleSubmit}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-base rounded-full"
        >
          <CheckCircle className="mr-2 h-5 w-5" />
          Submit Check-In
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          Autosaved at 08:42 AM
        </p>
      </div>

      {/* Motivational Quote */}
      <div className="mt-10 bg-primary/5 rounded-2xl p-6 text-center">
        <Quote className="h-6 w-6 mx-auto text-primary/40 mb-3" />
        <p className="text-muted-foreground italic leading-relaxed">
          &quot;Recovery is not a race. It&apos;s a journey of small, daily wins that build a lifetime of strength. You&apos;re doing better than you think.&quot;
        </p>
      </div>
    </div>
  )
}
