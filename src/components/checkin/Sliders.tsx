import {Activity, Smile} from 'lucide-react'

import {SliderCard} from '@/components/shared/SliderCard'

import {checkInTexts} from '@/constants/componentTexts/checkIn'

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
            label={checkInTexts.mood.label}
            minLabel={checkInTexts.mood.min}
            maxLabel={checkInTexts.mood.max}
            value={mood}
            onChange={setMood}
            colorVar={'primary'}
        />
        <SliderCard
            icon={Activity}
            label={checkInTexts.comfort.label}
            minLabel={checkInTexts.comfort.min}
            maxLabel={checkInTexts.comfort.max}
            value={comfort}
            onChange={setComfort}
            colorVar={'secondary'}
        />
    </div>
)
