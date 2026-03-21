'use client'

import { Trophy } from 'lucide-react'

import * as InsightsTexts from '@/constants/insightsComponentTexts'

export const MilestoneCard = () => (
  <div className={'rounded-2xl bg-gradient-to-br from-accent to-accent/80 p-6 text-accent-foreground h-full'}>
    <div className={'flex items-center justify-between'}>
      <Trophy className={'h-8 w-8 text-accent-foreground/80'} />
    </div>

    <h3 className={'mt-4 text-xl font-semibold'}>
      {InsightsTexts.INSIGHTS_MILESTONE_TITLE}
    </h3>

    <p className={'mt-2 text-accent-foreground/80 text-sm leading-relaxed'}>
      {InsightsTexts.INSIGHTS_MILESTONE_DESCRIPTION}
    </p>

    <div className={'mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5 text-xs font-medium'}>
      {InsightsTexts.INSIGHTS_MILESTONE_LABEL}
    </div>
  </div>
)
