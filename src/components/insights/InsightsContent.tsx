'use client'

import { AlertCards } from './AlertCards'
import { BehavioralPatterns } from './BehavioralPatterns'
import { CriticalInsight } from './CriticalInsight'
import { MilestoneCard } from './MilestoneCard'
import { InsightsSummary } from './Summary'

export const InsightsContent = () => (
  <div className={'p-6 space-y-6'}>
    {/* Top Row - Critical Insight and Milestone */}
    <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
      <div className={'lg:col-span-2'}>
        <CriticalInsight />
      </div>
      <div>
        <MilestoneCard />
      </div>
    </div>

    {/* Alert Cards */}
    <AlertCards />

    {/* Behavioral Patterns */}
    <BehavioralPatterns />

    {/* Weekly Trend Summary */}
    <InsightsSummary />
  </div>
)
