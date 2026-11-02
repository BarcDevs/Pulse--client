'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Loader2 } from 'lucide-react'

import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/shared/buttons/Button'
import { Card } from '@/components/shared/cards/Card'

import { useCheckInForm } from '@/hooks/forms/useCheckInForm'

import { wellnessColors } from '@/lib/wellnessColors'

import { isForbiddenError } from '@/utils/error'

import { checkInQueryKeys } from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'

import { handleCheckInSubmit } from '@/handlers/actions/checkIn'

import { checkInLocales } from '@/locales/checkInLocales'
import { startLocales } from '@/locales/startLocales'
import type { CheckInSchema } from '@/validations/forms/checkInSchema'

import { GuestJournalField } from './GuestJournalField'
import { GuestSlider } from './GuestSlider'

const GUEST_INITIAL_SCORE = 5

type GuestCheckInFormProps = {
    onLimitReachedAction: () => void
}

export const GuestCheckInForm = ({
    onLimitReachedAction
}: GuestCheckInFormProps) => {
    const t = useTranslations()
    const router = useRouter()
    const queryClient = useQueryClient()
    const { form } = useCheckInForm({
        latestCheckIn: null,
        stats: null,
        initialScore: GUEST_INITIAL_SCORE
    })
    const isBusy = form.formState.isSubmitting
    const [mood, pain, notes] = form.watch([
        'moodScore',
        'painLevel',
        'notes'
    ])

    const submit = async (data: CheckInSchema) => {
        try {
            await handleCheckInSubmit(data)
            // A second check-in in the same visit must not show the first one
            await queryClient.invalidateQueries({
                queryKey: checkInQueryKeys.all
            })
            router.push(ROUTES.START_RESULT)
        } catch (error) {
            if (isForbiddenError(error)) {
                onLimitReachedAction()
                return
            }
            form.setError('root', {
                message: t(startLocales.save.error)
            })
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(submit)}
            className={'flex flex-col gap-4'}
        >
            <Card
                aria-busy={isBusy}
                className={'gap-5.5 p-5 md:p-7'}
            >
                <GuestSlider
                    label={t(checkInLocales.mood.label)}
                    minLabel={t(checkInLocales.mood.min)}
                    maxLabel={t(checkInLocales.mood.max)}
                    value={mood}
                    color={wellnessColors.mood.primary}
                    disabled={isBusy}
                    onChange={(value) => form.setValue('moodScore', value)}
                />
                <GuestSlider
                    label={t(checkInLocales.pain.label)}
                    minLabel={t(checkInLocales.pain.min)}
                    maxLabel={t(checkInLocales.pain.max)}
                    value={pain}
                    color={wellnessColors.pain.primary}
                    disabled={isBusy}
                    onChange={(value) => form.setValue('painLevel', value)}
                />
                <GuestJournalField
                    value={notes ?? ''}
                    disabled={isBusy}
                    onChange={(value) => form.setValue('notes', value)}
                />
            </Card>
            {form.formState.errors.root && (
                <p className={'text-center text-sm text-destructive'}>
                    {form.formState.errors.root.message}
                </p>
            )}
            <Button
                type={'submit'}
                size={'lg'}
                disabled={isBusy}
                aria-busy={isBusy}
                className={'w-full'}
                data-testid={'guest-check-in-submit'}
            >
                {isBusy && <Loader2 className={'size-4.5 animate-spin'}/>}
                {t(startLocales.submitButton)}
            </Button>
            <p className={'text-center text-xs text-muted-foreground'}>
                {t(startLocales.footNote)}
            </p>
        </form>
    )
}
