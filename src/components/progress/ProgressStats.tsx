'use client'

import { Award, Calendar } from 'lucide-react'

import {
    PROGRESS_STATS_MILESTONES_LABEL,
    PROGRESS_STATS_MILESTONES_NEXT_PREFIX,
    PROGRESS_STATS_MILESTONES_NEXT_VALUE,
    PROGRESS_STATS_MILESTONES_UNIT,
    PROGRESS_STATS_STREAK_BEST_PREFIX,
    PROGRESS_STATS_STREAK_BEST_VALUE,
    PROGRESS_STATS_STREAK_LABEL,
    PROGRESS_STATS_STREAK_UNIT,
} from '@/constants/progressTexts'

export const ProgressStats = () => (
  <div className={'lg:col-span-2 grid grid-cols-2 gap-4'}>
    {/* Current Streak */}
    <div className={'rounded-2xl bg-surface-card p-6'}>
      <div className={'flex items-start justify-between'}>
        <div>
          <p className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
            {PROGRESS_STATS_STREAK_LABEL}
          </p>
          <div className={'mt-2 flex items-baseline gap-2'}>
            <span className={'text-4xl font-bold text-foreground'}>12</span>
            <span className={'text-lg text-muted-foreground'}>{PROGRESS_STATS_STREAK_UNIT}</span>
          </div>
          <p className={'mt-1 text-sm text-muted-foreground'}>
            {PROGRESS_STATS_STREAK_BEST_PREFIX}
            {' '}
            <span className={'text-secondary font-medium'}>{PROGRESS_STATS_STREAK_BEST_VALUE}</span>
          </p>
        </div>
        <div className={'h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center'}>
          <Calendar className={'h-6 w-6 text-warning'} />
        </div>
      </div>
    </div>

    {/* Total Milestones */}
    <div className={'rounded-2xl bg-surface-card p-6'}>
      <div className={'flex items-start justify-between'}>
        <div>
          <p className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
            {PROGRESS_STATS_MILESTONES_LABEL}
          </p>
          <div className={'mt-2 flex items-baseline gap-2'}>
            <span className={'text-4xl font-bold text-foreground'}>5</span>
            <span className={'text-lg text-muted-foreground'}>{PROGRESS_STATS_MILESTONES_UNIT}</span>
          </div>
          <p className={'mt-1 text-sm text-muted-foreground'}>
            {PROGRESS_STATS_MILESTONES_NEXT_PREFIX}
            {' '}
            <span className={'text-primary font-medium'}>{PROGRESS_STATS_MILESTONES_NEXT_VALUE}</span>
          </p>
        </div>
        <div className={'h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center'}>
          <Award className={'h-6 w-6 text-accent'} />
        </div>
      </div>
    </div>
  </div>
)
