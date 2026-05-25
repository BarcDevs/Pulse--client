import { useTranslations } from 'next-intl'

import { Activity, Smile } from 'lucide-react'

import type { FormControlProps } from '@/types/forms'

import { SliderCard } from '@/components/shared/inputs/SliderCard'

import { checkInLocales } from '@/locales/checkInLocales'
import type { CheckInSchema } from '@/validations/forms/checkInSchema'

type CheckInSlidersProps = FormControlProps<CheckInSchema>

export const CheckInSliders = ({
    watch,
    setValueAction
}: CheckInSlidersProps) => {
    const t = useTranslations()
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
                label={t(checkInLocales.mood.label)}
                minLabel={t(checkInLocales.mood.min)}
                maxLabel={t(checkInLocales.mood.max)}
                value={mood}
                onChange={handleMoodChange}
                colorVar={'primary'}
            />
            <SliderCard
                icon={Activity}
                label={t(checkInLocales.pain.label)}
                minLabel={t(checkInLocales.pain.min)}
                maxLabel={t(checkInLocales.pain.max)}
                value={pain}
                onChange={handlePainChange}
                colorVar={'secondary'}
            />
        </div>
    )
}
