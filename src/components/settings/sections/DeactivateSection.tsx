'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import axios from 'axios'
import { AlertTriangle } from 'lucide-react'

import { useMutation } from '@tanstack/react-query'

import { Button } from '@/components/shared/buttons/Button'
import { FormError } from '@/components/shared/ui/FormError'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'

import { useOtpForm } from '@/hooks/forms/useOtpForm'
import { useDeactivateAccount } from '@/hooks/mutations/useDeactivateAccount'

import { getLocalizedApiErrorMessage } from '@/utils/error'

import { requestDeleteAccountCode } from '@/api/users'
import { settingsLocales } from '@/locales/settingsLocales'

import { OtpCodeField } from '../items/OtpCodeField'
import { SecuritySettingItem } from '../items/SecuritySettingItem'

export const DeactivateSection = () => {
    const t = useTranslations()
    const [open, setOpen] = useState(false)
    // Deleting needs a code emailed to the account, so a stolen session
    // alone can't delete it
    const [step, setStep] = useState<'confirm' | 'otp'>('confirm')
    const {
        mutateAsync: deactivate,
        isPending: isDeleting
    } = useDeactivateAccount()
    const { form, handleSubmit } = useOtpForm({
        onSubmit: async (data) => {
            await deactivate(Number(data.otp))
        }
    })
    const {
        mutate: sendCode,
        isPending: isSendingCode
    } = useMutation({
        mutationFn: requestDeleteAccountCode,
        onSuccess: () => setStep('otp'),
        onError: (error) => form.setError('root', {
            type: 'manual',
            message: axios.isAxiosError(error)
                ? getLocalizedApiErrorMessage(
                    t,
                    error,
                    error.message
                )
                : error.message
        })
    })
    const isPending = isDeleting || isSendingCode

    const handleOpenChange = (next: boolean) => {
        setOpen(next)
        if (!next) {
            setStep('confirm')
            form.reset()
        }
    }

    return (
        <>
            <SecuritySettingItem
                icon={<AlertTriangle className={'h-5 w-5 text-destructive'}/>}
                label={t(settingsLocales.security.deactivate.label)}
                value={t(settingsLocales.security.deactivate.description)}
                variant={'destructive'}
                buttonText={t(settingsLocales.security.deactivate.buttonText)}
                onClickAction={() => setOpen(true)}
            />

            <Dialog
                open={open}
                onOpenChange={handleOpenChange}
            >
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>
                            {t(settingsLocales.security.deactivate.confirmTitle)}
                        </DialogTitle>
                        <DialogDescription>
                            {step === 'confirm'
                                ? t(settingsLocales.security.deactivate.confirmDescription)
                                : t(settingsLocales.security.deactivate.otpDescription)
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            className={'space-y-3 mt-4'}
                            onSubmit={handleSubmit}
                        >
                            {step === 'otp' && (
                                <OtpCodeField control={form.control}/>
                            )}
                            <FormError errors={form.formState.errors}/>
                            <div className={'flex justify-end gap-3'}>
                                <Button
                                    type={'button'}
                                    variant={'secondary'}
                                    onClick={() => handleOpenChange(false)}
                                    disabled={isPending}
                                >
                                    {t(settingsLocales.security.deactivate.cancelButton)}
                                </Button>
                                {step === 'confirm'
                                    ? (
                                        <Button
                                            type={'button'}
                                            variant={'destructive'}
                                            onClick={() => sendCode()}
                                            disabled={isPending}
                                        >
                                            {isSendingCode
                                                ? t(settingsLocales.security.deactivate.sendingCodeButton)
                                                : t(settingsLocales.security.deactivate.sendCodeButton)
                                            }
                                        </Button>
                                    )
                                    : (
                                        <Button
                                            type={'submit'}
                                            variant={'destructive'}
                                            disabled={isPending || form.watch('otp').length < 6}
                                        >
                                            {isDeleting
                                                ? t(settingsLocales.security.deactivate.confirmingButton)
                                                : t(settingsLocales.security.deactivate.confirmButton)
                                            }
                                        </Button>
                                    )
                                }
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}
