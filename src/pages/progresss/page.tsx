'use client'

import { Download, Share2 } from 'lucide-react'

import { AppHeader } from '@/components/AppHeader'
import { ProgressInsight } from '@/components/progress/Insight'
import { ProgressMilestones } from '@/components/progress/Milestones'
import { ProgressMoodChart } from '@/components/progress/MoodChart'
import { ProgressPainChart } from '@/components/progress/PainChart'
import { ProgressStats } from '@/components/progress/Stats'
import { Button } from '@/components/ui/Button'

export default function ProgressPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader title="Progress" subtitle="Visualizing your recovery journey. Small steps lead to big milestones." />

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          {/* Actions */}
          <div className="mb-6 flex flex-wrap items-center justify-end gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="size-4" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
              <Share2 className="size-4" />
              Share Journey
            </Button>
          </div>

          {/* Stats Summary */}
          <ProgressStats />

          {/* Charts Grid */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <ProgressMoodChart />
            <ProgressPainChart />
          </div>

          {/* Milestones */}
          <ProgressMilestones />

          {/* AI Insight */}
          <ProgressInsight />
        </div>
      </main>
    </div>
  )
}
