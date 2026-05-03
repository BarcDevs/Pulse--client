'use client'

import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

import { useShareProgress } from '@/hooks/ui/useShareProgress'

import { progressPageTexts } from '@/constants/componentTexts/progress'
import { sharedTexts } from '@/constants/componentTexts/ui/sharedTexts'

type ShareImageModalProps = {
    open: boolean
    onOpenChangeAction: (open: boolean) => void
    children: ReactNode
}

export const ShareProgressModal = ({
    open,
    onOpenChangeAction,
    children
}: ShareImageModalProps) => {
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
            <DialogContent className={'max-w-2xl'}>
                <DialogHeader>
                    <DialogTitle>
                        {progressPageTexts.share.modalTitle}
                    </DialogTitle>
                    <DialogDescription>
                        {progressPageTexts.share.modalDescription}
                    </DialogDescription>
                </DialogHeader>

                <div className={'flex justify-center overflow-auto max-h-96 mt-6'}>
                    <div
                        ref={shareRef}
                        className={'md:scale-50 scale-75 origin-top'}
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
                        {sharedTexts.download}
                    </Button>
                    <Button
                        onClick={share}
                        disabled={isCapturing}
                    >
                        {sharedTexts.share}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}