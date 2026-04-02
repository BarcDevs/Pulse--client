import {Activity, Smile} from 'lucide-react'

import type {FormControlProps} from '@/types/forms'

import {SliderCard} from '@/components/shared/inputs/SliderCard'

import {checkInTexts} from '@/constants/componentTexts/checkIn'

import type {CheckInSchema} from '@/validations/forms/checkInSchema'

type CheckInSlidersProps = FormControlProps<CheckInSchema>

export const CheckInSliders = ({
    watch,
    setValueAction
}: CheckInSlidersProps) => {
    const mood = watch('moodScore')
    const pain = watch('painLevel')

    const handleMoodChange = (value: number) =>
        setValueAction('moodScore', value)

    const handlePainChange = (value: number) =>
        setValueAction('painLevel', value)

    return (
        <div className={'grid gap-4 sm:grid-cols-2'}>
            <SliderCard
                icon={Smile}
                label={checkInTexts.mood.label}
                minLabel={checkInTexts.mood.min}
                maxLabel={checkInTexts.mood.max}
                value={mood}
                onChange={handleMoodChange}
                colorVar={'primary'}
            />
            <SliderCard
                icon={Activity}
                label={checkInTexts.pain.label}
                minLabel={checkInTexts.pain.min}
                maxLabel={checkInTexts.pain.max}
                value={pain}
                onChange={handlePainChange}
                colorVar={'secondary'}
            />
        </div>
    )
}
