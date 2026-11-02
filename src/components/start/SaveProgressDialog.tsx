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

import { authQueryKeys } from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'

import { upgradeGuest } from '@/api/auth'
import { startLocales } from '@/locales/startLocales'
import type { UpgradeGuestSchema } from '@/validations/forms/upgradeGuestSchema'

type SaveProgressDialogProps = {
    open: boolean
    isLimitReached?: boolean
    onOpenChangeAction: (open: boolean) => void
}

export const SaveProgressDialog = ({
    open,
    isLimitReached = false,
    onOpenChangeAction
}: SaveProgressDialogProps) => {
    const t = useTranslations()
    const router = useRouter()
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleUpgrade = async (data: UpgradeGuestSchema) => {
        setIsLoading(true)
        setError(null)
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
            setIsLoading(false)
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
                    isLoading={isLoading}
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
