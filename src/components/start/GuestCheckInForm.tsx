'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/shared/buttons/Button'

import { useCheckInForm } from '@/hooks/forms/useCheckInForm'

import { isForbiddenError } from '@/utils/error'

import { checkInQueryKeys } from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'

import { handleCheckInSubmit } from '@/handlers/actions/checkIn'

import { startLocales } from '@/locales/startLocales'
import type { CheckInSchema } from '@/validations/forms/checkInSchema'

import { CheckInSliders } from '../checkIn/inputs/Sliders'
import { CheckInJournal } from '../checkIn/sections/Journal'

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
        stats: null
    })

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
            {form.formState.errors.root && (
                <p className={'text-center text-sm text-destructive'}>
                    {form.formState.errors.root.message}
                </p>
            )}
            <div className={'flex justify-center pt-4'}>
                <Button
                    type={'submit'}
                    size={'lg'}
                    disabled={form.formState.isSubmitting}
                    data-testid={'guest-check-in-submit'}
                >
                    {t(startLocales.submitButton)}
                </Button>
            </div>
        </form>
    )
}
