'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { IosInstallSteps } from '@/components/pwa/IosInstallSteps'
import { BaseDialog } from '@/components/shared/BaseDialog'
import { Button } from '@/components/shared/buttons/Button'

import { useInstallPrompt } from '@/hooks/ui/useInstallPrompt'

import { pwaLocales } from '@/locales/pwaLocales'

export const InstallPromptDialog = () => {
    const t = useTranslations()
    const {
        mode,
        isOpen,
        install,
        dismiss
    } = useInstallPrompt()
    const isIosMode = mode === 'ios'

    return (
        <BaseDialog
            open={isOpen}
            onOpenChangeAction={dismiss}
            title={t(pwaLocales.install.title)}
            description={t(isIosMode ? pwaLocales.install.iosDescription : pwaLocales.install.description)}
            isCentered={true}
            className={'max-w-sm'}
            icon={
                <Image
                    src={'/icon-192.png'}
                    alt={''}
                    width={64}
                    height={64}
                    className={'mx-auto mb-2 size-16 rounded-2xl'}
                />
            }
        >
            {isIosMode && <IosInstallSteps/>}
            <div className={'flex justify-center gap-2'}>
                <Button
                    variant={'secondary'}
                    onClick={dismiss}
                >
                    {t(isIosMode ? pwaLocales.install.iosDone : pwaLocales.install.dismiss)}
                </Button>
                {!isIosMode && (
                    <Button onClick={install}>
                        {t(pwaLocales.install.action)}
                    </Button>
                )}
            </div>
        </BaseDialog>
    )
}
