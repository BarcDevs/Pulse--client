'use client'

import { useState } from 'react'

import { Check } from 'lucide-react'

import { AppHeader } from '@/components/AppHeader'
import { CheckInActivities } from '@/components/check-in/Activities'
import { CheckInJournal } from '@/components/check-in/Journal'
import { CheckInQuote } from '@/components/check-in/Quote'
import { CheckInSliders } from '@/components/check-in/Sliders'
import { Button } from '@/components/ui/Button'

export default function CheckInPage() {
  const [mood, setMood] = useState(50)
  const [comfort, setComfort] = useState(50)
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    'Meditating',
    'Hydrated',
  ])
  const [journalEntry, setJournalEntry] = useState('')

  const handleSubmit = () => {
    // Handle form submission
    console.log({ mood, comfort, selectedActivities, journalEntry })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader title="Health Overview" />

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-[var(--foreground)]">
              Daily Check-In
            </h1>
            <p className="mt-2 text-[var(--muted-foreground)]">
              Take a moment to center yourself and log your progress.
            </p>
          </div>

          {/* Sliders */}
          <CheckInSliders
            mood={mood}
            setMood={setMood}
            comfort={comfort}
            setComfort={setComfort}
          />

          {/* Activities */}
          <CheckInActivities
            selectedActivities={selectedActivities}
            setSelectedActivities={setSelectedActivities}
          />

          {/* Journal */}
          <CheckInJournal
            value={journalEntry}
            onChange={setJournalEntry}
          />

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="min-w-[200px] bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
            >
              <Check className="mr-2 size-5" />
              Submit Check-In
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-[var(--muted-foreground)]">
            AUTOSAVED AT 09:42 AM
          </p>

          {/* Quote */}
          <CheckInQuote />
        </div>
      </main>
    </div>
  )
}
