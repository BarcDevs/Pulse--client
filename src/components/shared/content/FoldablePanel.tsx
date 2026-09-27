'use client'

import {
    ReactNode,
    useEffect,
    useRef
} from 'react'

import { ClassName } from '@/types/react'

import { cn } from '@/lib/utils'

type FoldablePanelProps = {
    open: boolean
    onFound: () => void
    children: ReactNode
    className?: ClassName
}

export const FoldablePanel = ({
    open,
    onFound,
    children,
    className
}: FoldablePanelProps) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current

        element?.addEventListener('beforematch', onFound)

        return () => element?.removeEventListener('beforematch', onFound)
    }, [onFound])

    useEffect(() => {
        if (open) ref.current?.removeAttribute('hidden')
        else ref.current?.setAttribute('hidden', 'until-found')
    }, [open])

    return (
        <div className={cn('grid transition-[grid-template-rows] duration-200', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
            <div
                ref={ref}
                style={open ? undefined : { contentVisibility: 'hidden' }}
                className={'min-h-0 overflow-hidden transition-[content-visibility] duration-200 transition-discrete'}
            >
                <div className={className}>
                    {children}
                </div>
            </div>
        </div>
    )
}
