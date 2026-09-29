'use client'

import { useContext } from 'react'

import { OTPInputContext } from 'input-otp'

import { cn } from '@/lib/utils'

type OtpSlotsProps = {
    length: number
}

export const OtpSlots = ({ length }: OtpSlotsProps) => {
    const context = useContext(OTPInputContext)

    return (
        <>
            {Array.from({ length }, (_, i) => {
                const slot = context?.slots[i]
                const isFilled = Boolean(slot?.char)
                const isHighlighted = slot?.isActive || isFilled

                return (
                    <div
                        key={i}
                        className={cn(
                            'flex h-14 w-full items-center justify-center rounded-md border text-center font-mono text-2xl font-bold text-primary transition-colors',
                            isFilled ? 'bg-card' : 'bg-muted',
                            isHighlighted ? 'border-primary' : 'border-border'
                        )}
                    >
                        {slot?.char}
                    </div>
                )
            })}
        </>
    )
}
