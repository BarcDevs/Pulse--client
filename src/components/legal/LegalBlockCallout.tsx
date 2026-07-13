import {
    AlertTriangle,
    Info
} from 'lucide-react'

import { LegalCalloutBlock } from '@/types/legal'

import { cn } from '@/lib/utils'

type LegalBlockCalloutProps = {
    block: LegalCalloutBlock
}

export const LegalBlockCallout = ({ block }: LegalBlockCalloutProps) => {
    const isWarn = block.tone === 'warn'

    return (
        <div className={cn(
            'mb-4 mt-2 flex gap-3 rounded-xl border p-4',
            isWarn
                ? 'border-destructive/30 bg-destructive/5'
                : 'border-primary/30 bg-primary/5'
        )}
        >
            <div className={'flex size-7 shrink-0 items-center justify-center rounded-lg bg-card'}>
                {isWarn ? (
                    <AlertTriangle
                        size={14}
                        className={'text-destructive'}
                    />
                ) : (
                    <Info
                        size={14}
                        className={'text-primary'}
                    />
                )}
            </div>
            <p className={'text-sm leading-relaxed text-on-surface'}>
                {block.callout}
            </p>
        </div>
    )
}
