'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import type {
    CheckIn,
    CheckInStats
} from '@/types/checkIn'

import { Button } from '@/components/ui/button'

import { useCheckInForm } from '@/hooks/forms/useCheckInForm'

import { handleCheckInSubmit } from '@/handlers/actions/checkIn'

import { checkInLocales } from '@/locales/checkInLocales'
import type { CheckInSchema } from '@/validations/forms/checkInSchema'

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
                message: t(checkInLocales.submitError)
            })
        }
    }

    const { root, ...fieldErrors } = form.formState.errors
    const errorMessage = Object.values(fieldErrors)
        .map(e => Array.isArray(e)
            ? e[0]?.message
            : (e as { message?: string })?.message
        ).find(Boolean) ?? root?.message

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
            {errorMessage && (
                <p className={'text-center text-sm text-destructive'}>
                    {errorMessage}
                </p>
            )}
            <div className={'flex justify-center pt-4'}>
                <Button
                    type={'submit'}
                    size={'lg'}
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? t(checkInLocales.submittingButton)
                        : t(checkInLocales.submitButton)}
                </Button>
            </div>
        </form>
    )
}
