'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useQueryClient } from '@tanstack/react-query'

import { AuthForm } from '@/components/form/AuthForm'
import { Button } from '@/components/shared/buttons/Button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

import { isConflictError } from '@/utils/error'

import {
    authQueryKeys,
    checkInQueryKeys
} from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'

import { upgradeGuest } from '@/api/auth'
import { startLocales } from '@/locales/startLocales'
import type { UpgradeGuestSchema } from '@/validations/forms/upgradeGuestSchema'

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
    const [error, setError] = useState<string | null>(null)

    // Optimistic: the dialog closes at once and reopens with the error if the
    // upgrade fails
    const handleUpgrade = async (data: UpgradeGuestSchema) => {
        setError(null)
        onOpenChangeAction(false)
        // The server revokes the old token as soon as the upgrade commits, so
        // a poll in flight would get a 401 and log the guest out mid-upgrade
        onUpgradingChangeAction?.(true)
        await queryClient.cancelQueries({
            queryKey: checkInQueryKeys.all
        })
        try {
            await upgradeGuest(data)
            await queryClient.invalidateQueries({
                queryKey: authQueryKeys.getMe
            })
            router.push(ROUTES.DASHBOARD)
        } catch (upgradeError) {
            setError(
                t(
                    isConflictError(upgradeError as Error)
                        ? startLocales.save.emailTaken
                        : startLocales.save.error
                )
            )
            onUpgradingChangeAction?.(false)
            onOpenChangeAction(true)
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChangeAction}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {t(startLocales.save.title)}
                    </DialogTitle>
                    <DialogDescription>
                        {t(
                            isLimitReached
                                ? startLocales.save.limitReached
                                : startLocales.save.description
                        )}
                    </DialogDescription>
                </DialogHeader>
                <AuthForm
                    formType={'upgradeGuest'}
                    onSuccessAction={handleUpgrade}
                    error={error}
                />
                <Button
                    type={'button'}
                    variant={'ghost'}
                    onClick={() => onOpenChangeAction(false)}
                >
                    {t(startLocales.save.later)}
                </Button>
            </DialogContent>
        </Dialog>
    )
}
