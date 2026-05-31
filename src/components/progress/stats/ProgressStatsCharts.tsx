'use client'

import { MoodTrendChart } from '../charts/MoodTrendChart'
import { PainIntensityChart } from '../charts/PainIntensityChart'

import { ProgressStats } from './ProgressStats'

export const ProgressStatsCharts = () => (
    <div className={'space-y-6'}>
        <ProgressStats/>
        <div className={'grid grid-cols-1 lg:grid-cols-2 gap-6'}>
            <MoodTrendChart/>
            <PainIntensityChart/>
        </div>
    </div>
)
