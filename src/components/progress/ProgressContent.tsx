'use client'

import { ProgressMilestones } from './Milestones'
import { MoodTrendChart } from './MoodTrendChart'
import { PainIntensityChart } from './PainIntensityChart'
import { ProgressStats } from './ProgressStats'
import { RecoveryInsight } from './RecoveryInsight'
import { WellnessScore } from './WellnessScore'

export const ProgressContent = () => (
  <div className={'p-6 space-y-6'}>
    {/* Top Stats Row */}
    <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
      <ProgressStats />
      <WellnessScore />
    </div>

    {/* Charts Row */}
    <div className={'grid grid-cols-1 lg:grid-cols-2 gap-6'}>
      <MoodTrendChart />
      <PainIntensityChart />
    </div>

    {/* Milestones Section */}
    <ProgressMilestones />

    {/* Recovery Insight */}
    <RecoveryInsight />
  </div>
)
