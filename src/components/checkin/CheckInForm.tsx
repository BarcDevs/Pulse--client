'use client'

import type {
    CheckIn,
    CheckInStats
} from '@/types/checkIn'

import {Button} from '@/components/ui/button'

import {useCheckInForm} from '@/hooks/useCheckInForm'

import * as CheckInTexts from '@/constants/checkInTexts'

import {handleCheckInSubmit} from '@/handlers/actions/checkIn'

import type {CheckInSchema} from '@/validations/forms/checkInSchema'

import {CheckInActivities} from './ActivitySelector'
import {CheckInJournal} from './Journal'
import {CheckInSliders} from './Sliders'

type CheckInFormProps = {
    latestCheckIn?: CheckIn | null
    stats?: CheckInStats | null
}

export const CheckInForm = ({
    latestCheckIn = null,
    stats = null
}: CheckInFormProps) => {
    const { form } = useCheckInForm({
        latestCheckIn,
        stats
    })

    const selectedActivities = form.watch('activities')
    const notes = form.watch('notes') ?? ''

    const onSubmit = async (data: CheckInSchema) => {
        try {
            await handleCheckInSubmit(data)
        } catch {
            form.setError('root', {
                message: 'Failed to submit check-in. Please try again.'
            })
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={'space-y-6'}
        >
            <CheckInSliders
                mood={form.getValues('moodScore')}
                setMood={
                    (value) => form.setValue(
                        'moodScore',
                        value
                    )
                }
                comfort={form.getValues('painLevel')}
                setComfort={
                    (value) => form.setValue(
                        'painLevel',
                        value
                    )
                }
            />
            <CheckInJournal
                value={notes}
                onChange={
                    (value) => form.setValue(
                        'notes',
                        value
                    )
                }
            />
            <CheckInActivities
                selectedActivities={selectedActivities}
                setSelectedActivities={
                    (activities) => form.setValue(
                        'activities',
                        activities
                    )
                }
            />
            <div className={'flex justify-center pt-4'}>
                <Button
                    type={'submit'}
                    size={'lg'}
                    disabled={form.formState.isSubmitting}
                >
                    {CheckInTexts.CHECK_IN_SUBMIT_BUTTON}
                </Button>
            </div>
        </form>
    )
}
