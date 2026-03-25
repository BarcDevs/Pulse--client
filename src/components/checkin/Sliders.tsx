import { Activity, Smile } from 'lucide-react'

import { SliderCard } from '@/components/shared/SliderCard'

import * as CheckInTexts from '@/constants/checkInTexts'

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
            label={CheckInTexts.CHECKIN_MOOD_LABEL}
            minLabel={CheckInTexts.CHECKIN_MOOD_MIN}
            maxLabel={CheckInTexts.CHECKIN_MOOD_MAX}
            value={mood}
            onChange={setMood}
            colorVar={'primary'}
        />
        <SliderCard
            icon={Activity}
            label={CheckInTexts.CHECKIN_COMFORT_LABEL}
            minLabel={CheckInTexts.CHECKIN_COMFORT_MIN}
            maxLabel={CheckInTexts.CHECKIN_COMFORT_MAX}
            value={comfort}
            onChange={setComfort}
            colorVar={'secondary'}
        />
    </div>
)
