'use client'

import {
    createContext,
    useContext,
    useState
} from 'react'

import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

import { he } from 'date-fns/locale'
import { toast } from 'sonner'

import { useQueryClient } from '@tanstack/react-query'

import { ContextProps } from '@/types/react'

import { useProfile } from '@/hooks/queries/useProfile'

import { applyOptimisticCheckIn } from '@/lib/checkIn/optimisticCheckIn'

import { checkInQueryKeys } from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'
import { secondInMs } from '@/constants/time'

import { handleCheckInSubmit } from '@/handlers/actions/checkIn'

import { checkInLocales } from '@/locales/checkInLocales'
import { globalLocales } from '@/locales/globalLocales'
import { CheckInSchema } from '@/validations/forms/checkInSchema'

type CheckInContextType = {
    isPending: boolean
    isSubmitted: boolean
    submitCheckIn: (data: CheckInSchema) => void
}

export const CheckInContext =
    createContext<CheckInContextType | null>(null)

export const CheckInProvider = ({
    children
}: ContextProps) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const t = useTranslations()
    const locale = useLocale()
    const { profile } = useProfile()
    const dateFnsLocale = locale === 'he-IL' ? he : undefined
    const [isPending, setIsPending] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const runSubmit = async (
        data: CheckInSchema,
        onRollback: () => void,
        onReapply: () => () => void
    ) => {
        try {
            const checkIn = await handleCheckInSubmit(data)
            checkIn.insights?.forEach((insight) => {
                toast(insight.title, {
                    description: insight.content,
                    duration: 8 * secondInMs
                })
            })
            void queryClient.invalidateQueries({
                queryKey: checkInQueryKeys.all
            })
        } catch {
            onRollback()
            toast.error(t(checkInLocales.submitError), {
                action: {
                    label: t(globalLocales.shared.retry),
                    onClick: () => {
                        setIsPending(true)
                        const newRollback = onReapply()
                        void runSubmit(
                            data,
                            newRollback,
                            onReapply
                        )
                    }
                },
                duration: 5 * secondInMs
            })
        } finally {
            setIsPending(false)
            setIsSubmitted(false)
        }
    }

    const submitCheckIn = (data: CheckInSchema) => {
        const applyOptimistic = applyOptimisticCheckIn(
            queryClient,
            data,
            dateFnsLocale,
            profile?.timezone
        )
        const rollback = applyOptimistic()

        setIsPending(true)
        setIsSubmitted(true)
        router.push(ROUTES.PROGRESS)
        void runSubmit(
            data,
            rollback,
            applyOptimistic
        )
    }

    const value: CheckInContextType = {
        isPending,
        isSubmitted,
        submitCheckIn
    }

    return (
        <CheckInContext.Provider value={value}>
            {children}
        </CheckInContext.Provider>
    )
}

export const useCheckIn = () => {
    const context = useContext(CheckInContext)
    if (!context) {
        throw new Error(
            'useCheckIn must be used within CheckInProvider'
        )
    }
    return context
}
