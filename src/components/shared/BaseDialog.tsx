'use client'

import { ReactNode } from 'react'

import { ClassName } from '@/types/react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

import { cn } from '@/lib/utils'

type BaseDialogProps = {
    open: boolean
    onOpenChangeAction: (isOpen: boolean) => void
    title: ReactNode
    description?: ReactNode
    icon?: ReactNode
    isCentered?: boolean
    className?: ClassName
    descriptionClassName?: ClassName
    children?: ReactNode
}

export const BaseDialog = ({
    open,
    onOpenChangeAction,
    title,
    description,
    icon,
    isCentered = false,
    className,
    descriptionClassName,
    children
}: BaseDialogProps) => (
    <Dialog
        open={open}
        onOpenChange={onOpenChangeAction}
    >
        <DialogContent
            showCloseButton={false}
            className={className}
            {...(!description && { 'aria-describedby': undefined })}
        >
            <DialogHeader>
                {icon}
                <DialogTitle className={cn(isCentered && 'text-center')}>
                    {title}
                </DialogTitle>
                {description && (
                    <DialogDescription className={cn(isCentered && 'text-center', descriptionClassName)}>
                        {description}
                    </DialogDescription>
                )}
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
)
