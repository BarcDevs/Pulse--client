'use client'

import { useTranslations } from 'next-intl'

import type {
    CheckIn,
    CheckInStats
} from '@/types/checkIn'

import { Button } from '@/components/ui/button'

import { useCheckInForm } from '@/hooks/forms/useCheckInForm'
import { useProfile } from '@/hooks/queries/useProfile'

import { useCheckIn } from '@/context/CheckInContext'

import { checkInLocales } from '@/locales/checkInLocales'

import { CheckInActivities } from '../inputs/ActivitySelector'
import { CheckInSliders } from '../inputs/Sliders'
import { CheckInJournal } from '../sections/Journal'

type CheckInFormProps = {
    latestCheckIn?: CheckIn | null
    stats?: CheckInStats | null
}

export const CheckInForm = ({
    latestCheckIn = null,
    stats = null
}: CheckInFormProps) => {
    const t = useTranslations()
    const { submitCheckIn } = useCheckIn()
    const { profile } = useProfile()
    const {
        form,
        suggestedActivities
    } = useCheckInForm({
        latestCheckIn,
        stats,
        timezone: profile?.timezone
    })

    const {
        root,
        ...fieldErrors
    } = form.formState.errors
    const errorMessage = Object.values(fieldErrors)
        .map(e => Array.isArray(e)
            ? e[0]?.message
            : (e as { message?: string })?.message
        ).find(Boolean) ?? root?.message

    return (
        <form
            onSubmit={form.handleSubmit(submitCheckIn)}
            className={'space-y-6'}
        >
            <CheckInSliders
                watch={form.watch}
                setValueAction={form.setValue}
            />
            <CheckInJournal
                watch={form.watch}
                setValueAction={form.setValue}
            />
            <CheckInActivities
                watch={form.watch}
                setValueAction={form.setValue}
                suggestedActivities={suggestedActivities}
            />
            {errorMessage && (
                <p className={'text-center text-sm text-destructive'}>
                    {errorMessage}
                </p>
            )}
            <div className={'flex justify-center pt-4'}>
                <Button
                    type={'submit'}
                    size={'lg'}
                >
                    {t(checkInLocales.submitButton)}
                </Button>
            </div>
        </form>
    )
}
