'use client'

import {ReactNode} from 'react'

type ChartTooltipContentProps = {
    active?: boolean
    payload?: Array<{
        value: number | string
        name: string
        color?: string
    }>
    label?: string
    formatter?:
        (value: number | string) => string | [string]
}

export const ChartTooltipContent = ({
    active,
    payload,
    label,
    formatter
}: ChartTooltipContentProps): ReactNode => {
    if (!active || !payload?.length) return null

    const contentStyle = {
        backgroundColor: 'var(--background)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: '8px 12px',
        color: '#4a90e2'
    }

    return (
        <div style={contentStyle}>
            {label && (
                <div>{label}</div>
            )}
            {payload.map((entry, index) => {
                const value = formatter ?
                    formatter(entry.value) :
                    entry.value

                const displayValue = Array.isArray(value) ?
                    value[0] :
                    value

                return (
                    <div key={index}>
                        {displayValue}
                    </div>
                )
            })}
        </div>
    )
}
