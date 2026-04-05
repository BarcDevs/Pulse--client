'use client'

import {
    Check,
    ChevronDown
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type DropdownSelectorProps = {
    value: string
    options: Record<string, string>
    onChangeAction: (value: string) => void
    label?: string
    description?: string
}

export const DropdownSelector = ({
    value,
    options,
    onChangeAction,
    label,
    description
}: DropdownSelectorProps) => (
    <div className={'p-4 rounded-xl bg-surface-section'}>
        {label && (
            <h4 className={'font-medium text-foreground mb-1'}>
                {label}
            </h4>
        )}
        {description && (
            <p className={'text-sm text-muted-foreground mb-3'}>
                {description}
            </p>
        )}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={'outline'}
                    className={'w-full justify-between text-foreground'}
                >
                    {options[value] || value}
                    <ChevronDown className={'h-4 w-4 opacity-50'}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={'start'}
                className={'w-40'}
            >
                {Object.entries(options).map((
                    [key, label]
                ) => (
                    <DropdownMenuItem
                        key={key}
                        onClick={() => onChangeAction(key)}
                    >
                        <Check
                            className={`h-4 w-4 mr-2 ${
                                key === value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            }`}
                        />
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
)
