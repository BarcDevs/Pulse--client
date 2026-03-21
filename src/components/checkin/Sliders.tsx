'use client'

import { Activity, Smile } from 'lucide-react'

import { SliderCard } from '@/components/shared/SliderCard'

import {
    CHECKIN_COMFORT_LABEL,
    CHECKIN_COMFORT_MAX,
    CHECKIN_COMFORT_MIN,
    CHECKIN_MOOD_LABEL,
    CHECKIN_MOOD_MAX,
    CHECKIN_MOOD_MIN,
} from '@/constants/checkInTexts'

type CheckInSlidersProps = {
    mood: number
    setMood: (value: number) => void
    comfort: number
    setComfort: (value: number) => void
}

export const CheckInSliders = ({
    mood,
    setMood,
    comfort,
    setComfort
}: CheckInSlidersProps) => (
    <div className={'grid gap-4 sm:grid-cols-2'}>
        <SliderCard
            icon={Smile}
            label={CHECKIN_MOOD_LABEL}
            minLabel={CHECKIN_MOOD_MIN}
            maxLabel={CHECKIN_MOOD_MAX}
            value={mood}
            onChange={setMood}
            colorVar={'primary'}
        />
        <SliderCard
            icon={Activity}
            label={CHECKIN_COMFORT_LABEL}
            minLabel={CHECKIN_COMFORT_MIN}
            maxLabel={CHECKIN_COMFORT_MAX}
            value={comfort}
            onChange={setComfort}
            colorVar={'secondary'}
        />
    </div>
)
