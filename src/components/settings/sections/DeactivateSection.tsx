'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

import { useDeactivateAccount } from '@/hooks/mutations/useDeactivateAccount'

import { settingsLocales } from '@/locales/settingsLocales'

import { SecuritySettingItem } from '../items/SecuritySettingItem'

export const DeactivateSection = () => {
    const t = useTranslations()
    const [open, setOpen] = useState(false)
    const { mutate: deactivate, isPending } = useDeactivateAccount()

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
                onOpenChange={setOpen}
            >
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>
                            {t(settingsLocales.security.deactivate.confirmTitle)}
                        </DialogTitle>
                        <DialogDescription>
                            {t(settingsLocales.security.deactivate.confirmDescription)}
                        </DialogDescription>
                    </DialogHeader>
                    <div className={'flex justify-end gap-3 mt-4'}>
                        <Button
                            variant={'outline'}
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            {t(settingsLocales.security.deactivate.cancelButton)}
                        </Button>
                        <Button
                            variant={'destructive'}
                            onClick={() => deactivate()}
                            disabled={isPending}
                        >
                            {isPending
                                ? t(settingsLocales.security.deactivate.confirmingButton)
                                : t(settingsLocales.security.deactivate.confirmButton)
                            }
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
