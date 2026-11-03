'use client'

import {
    startTransition,
    useOptimistic,
    useRef,
    useState
} from 'react'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useQueryClient } from '@tanstack/react-query'

import { AuthForm } from '@/components/form/AuthForm'
import { BaseDialog } from '@/components/shared/BaseDialog'
import { TextButton } from '@/components/shared/buttons/TextButton'

import { isConflictError } from '@/utils/error'

import {
    authQueryKeys,
    checkInQueryKeys
} from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'

import { upgradeGuest } from '@/api/auth'
import { startLocales } from '@/locales/startLocales'
import type { UpgradeGuestSchema } from '@/validations/forms/upgradeGuestSchema'

import { GoogleSignupButton } from './GoogleSignupButton'
import type { SaveErrorKind } from './SaveErrorMessage'
import { SaveErrorMessage } from './SaveErrorMessage'

type SaveProgressDialogProps = {
    open: boolean
    isLimitReached?: boolean
    onOpenChangeAction: (open: boolean) => void
    onUpgradingChangeAction?: (isUpgrading: boolean) => void
}

export const SaveProgressDialog = ({
    open,
    isLimitReached = false,
    onOpenChangeAction,
    onUpgradingChangeAction
}: SaveProgressDialogProps) => {
    const t = useTranslations()
    const router = useRouter()
    const queryClient = useQueryClient()
    const [error, setError] = useState<SaveErrorKind | null>(null)
    const [isOpen, setOptimisticOpen] = useOptimistic(open)
    const isUpgradingRef = useRef(false)

    // The dialog closes at once. If the upgrade throws, React puts `open`
    // back by itself and the error shows when it reopens
    const handleUpgrade = (data: UpgradeGuestSchema) => {
        if (isUpgradingRef.current) return
        isUpgradingRef.current = true
        // The server revokes the old token as soon as the upgrade commits, so
        // a poll sent later would get a 401 mid-upgrade. Set outside the
        // transition: React holds state updates made inside one until the
        // action ends, which would leave the poll running
        setError(null)
        onUpgradingChangeAction?.(true)

        startTransition(async () => {
            setOptimisticOpen(false)
            await queryClient.cancelQueries({
                queryKey: checkInQueryKeys.all
            })
            try {
                const { user } = await upgradeGuest(data)
                queryClient.setQueryData(authQueryKeys.getMe, user)
                onOpenChangeAction(false)
                router.push(ROUTES.DASHBOARD)
            } catch (upgradeError) {
                setError(
                    isConflictError(upgradeError)
                        ? 'emailTaken'
                        : 'failed'
                )
                onUpgradingChangeAction?.(false)
                isUpgradingRef.current = false
            }
        })
    }

    const handleOpenChange = (next: boolean) => {
        if (!next) setError(null)
        onOpenChangeAction(next)
    }

    return (
        <BaseDialog
            open={isOpen}
            onOpenChangeAction={handleOpenChange}
            title={t(startLocales.save.title)}
            description={t(
                isLimitReached
                    ? startLocales.save.limitReached
                    : startLocales.save.description
            )}
            isCentered={true}
            preventAutoFocus={true}
            className={'max-w-sm'}
        >
            <AuthForm
                formType={'upgradeGuest'}
                onSuccessAction={handleUpgrade}
                error={error && <SaveErrorMessage kind={error}/>}
            />
            <GoogleSignupButton/>
            <TextButton
                type={'button'}
                tone={'muted'}
                onClick={() => handleOpenChange(false)}
                className={'min-h-11 w-full'}
            >
                {t(startLocales.save.later)}
            </TextButton>
        </BaseDialog>
    )
}
