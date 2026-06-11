'use client'

import { useTranslations } from 'next-intl'

import { WrapperProps } from '@/types/react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

import { useShareProgress } from '@/hooks/ui/useShareProgress'

import { progressLocales } from '@/locales/progressLocales'

type ShareImageModalProps = {
    open: boolean
    onOpenChangeAction: (open: boolean) => void
} & WrapperProps

export const ShareProgressModal = ({
    open,
    onOpenChangeAction,
    children
}: ShareImageModalProps) => {
    const t = useTranslations()
    const {
        shareRef,
        isCapturing,
        share,
        download
    } = useShareProgress()

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChangeAction}
        >
            <DialogContent
                className={'max-w-2xl'}
                showCloseButton={false}
            >
                <DialogHeader>
                    <DialogTitle>
                        {t(progressLocales.share.modalTitle)}
                    </DialogTitle>
                    <DialogDescription>
                        {t(progressLocales.share.modalDescription)}
                    </DialogDescription>
                </DialogHeader>

                <div className={'flex justify-center overflow-auto max-h-96 mt-6'}>
                    <div
                        ref={shareRef}
                        className={'text-[10px] sm:text-base'}
                    >
                        {children}
                    </div>
                </div>

                <div className={'flex gap-3 justify-end pt-4'}>
                    <Button
                        variant={'outline'}
                        onClick={download}
                        disabled={isCapturing}
                    >
                        {t(progressLocales.share.download)}
                    </Button>
                    <Button
                        onClick={share}
                        disabled={isCapturing}
                    >
                        {t(progressLocales.share.share)}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}