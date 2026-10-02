'use client'

import type { CheckInInsight } from '@/types/checkIn'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

type InsightDialogProps = {
    insight: CheckInInsight | null
    onOpenChangeAction: (isOpen: boolean) => void
}

export const InsightDialog = ({
    insight,
    onOpenChangeAction
}: InsightDialogProps) => (
    <Dialog
        open={!!insight}
        onOpenChange={onOpenChangeAction}
    >
        <DialogContent className={'max-h-[85dvh] overflow-y-auto'}>
            <DialogHeader>
                <DialogTitle>
                    {insight?.title}
                </DialogTitle>
                <DialogDescription className={'whitespace-pre-line text-foreground'}>
                    {insight?.content}
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
)
