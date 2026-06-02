'use client'

import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'

type Props = {
    label: string
    value: string
    placeholder?: string
    error?: string
    className?: string
    onChangeAction: (value: string) => void
}

export const EditTextField = ({
    label,
    value,
    placeholder,
    error,
    className,
    onChangeAction
}: Props) => (
    <div className={cn(className)}>
        <p className={'label-uppercase label-rtl text-muted-foreground font-normal mb-2'}>
            {label}
        </p>
        <Input
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChangeAction(e.target.value)}
            className={cn('bg-muted', error && 'border-destructive')}
        />
        {error && (
            <p className={'mt-1 text-xs text-destructive'}>
                {error}
            </p>
        )}
    </div>
)
