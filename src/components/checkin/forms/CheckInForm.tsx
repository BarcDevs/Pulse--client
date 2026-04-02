'use client'

import {useRouter} from 'next/navigation'

import type {
    CheckIn,
    CheckInStats
} from '@/types/checkIn/checkIn'

import {Button} from '@/components/ui/button'

import {useCheckInForm} from '@/hooks/forms/useCheckInForm'

import {checkInTexts} from '@/constants/componentTexts/checkIn'

import {handleCheckInSubmit} from '@/handlers/actions/checkIn'

import type {CheckInSchema} from '@/validations/forms/checkInSchema'

import {CheckInActivities} from '../inputs/ActivitySelector'
import {CheckInSliders} from '../inputs/Sliders'
import {CheckInJournal} from '../sections/Journal'

type CheckInFormProps = {
    latestCheckIn?: CheckIn | null
    stats?: CheckInStats | null
}

export const CheckInForm = ({
    latestCheckIn = null,
    stats = null
}: CheckInFormProps) => {
    const router = useRouter()
    const {
        form,
        suggestedActivities
    } = useCheckInForm({
        latestCheckIn,
        stats
    })

    const onSubmit = async (data: CheckInSchema) => {
        try {
            await handleCheckInSubmit(data)
            router.push('/progress')
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
            <div className={'flex justify-center pt-4'}>
                <Button
                    type={'submit'}
                    size={'lg'}
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ?
                        checkInTexts.submittingButton :
                        checkInTexts.submitButton}
                </Button>
            </div>
        </form>
    )
}
