'use client'

import { MoodTrendChart } from '../progress/charts/MoodTrendChart'
import { PainIntensityChart } from '../progress/charts/PainIntensityChart'

// A guest has one check-in and no history, so the week-over-week summary and
// the streak and milestone cards (which also need goals) are left out
export const GuestResultCharts = () => (
    <div className={'grid grid-cols-1 lg:grid-cols-2 gap-6'}>
        <MoodTrendChart/>
        <PainIntensityChart/>
    </div>
)
