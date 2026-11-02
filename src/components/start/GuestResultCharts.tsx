'use client'

import { WellnessCard } from '../progress/cards/WellnessCard'
import { MoodTrendChart } from '../progress/charts/MoodTrendChart'
import { PainIntensityChart } from '../progress/charts/PainIntensityChart'

// Streak and milestone cards read goals, which a guest cannot reach
export const GuestResultCharts = () => (
    <div className={'space-y-6'}>
        <WellnessCard/>
        <div className={'grid grid-cols-1 lg:grid-cols-2 gap-6'}>
            <MoodTrendChart/>
            <PainIntensityChart/>
        </div>
    </div>
)
