'use client'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import { MoodTrendChart } from '../charts/MoodTrendChart'
import { PainIntensityChart } from '../charts/PainIntensityChart'

import { ProgressStats } from './ProgressStats'
import { WellnessScore } from './WellnessScore'

export const ProgressStatsCharts = () => {
    useCheckInStats('weekly')

    return (
        <div className={'space-y-6'}>
            <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
                <ProgressStats/>
                <WellnessScore/>
            </div>
            <div className={'grid grid-cols-1 lg:grid-cols-2 gap-6'}>
                <MoodTrendChart/>
                <PainIntensityChart/>
            </div>
        </div>
    )
}