'use client'

import { useState } from 'react'

import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command'
import {
    Popover,
    PopoverAnchor,
    PopoverContent
} from '@/components/ui/popover'

import { useLocationSuggestions } from '@/hooks/queries/useLocationSuggestions'

import { cn } from '@/lib/utils'

type Props = {
    label: string
    value: string
    placeholder?: string
    error?: string
    className?: string
    onChangeAction: (value: string) => void
}

export const LocationField = ({
    label,
    value,
    placeholder,
    error,
    className,
    onChangeAction
}: Props) => {
    const [isFocused, setIsFocused] = useState(false)
    const { data: suggestions = [] } = useLocationSuggestions(value)
    const isOpen = isFocused && suggestions.length > 0

    const selectSuggestion = (selected: string) => {
        onChangeAction(selected)
        setIsFocused(false)
    }

    return (
        <div className={cn(className)}>
            <p className={'label-uppercase label-rtl text-muted-foreground font-normal mb-2'}>
                {label}
            </p>
            <Command
                shouldFilter={false}
                className={'overflow-visible bg-transparent'}
            >
                <Popover open={isOpen}>
                    <PopoverAnchor>
                        <CommandInput
                            value={value}
                            onValueChange={onChangeAction}
                            placeholder={placeholder}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className={cn('bg-muted', error && 'border-destructive')}
                        />
                    </PopoverAnchor>
                    <PopoverContent
                        className={'w-(--radix-popover-trigger-width) p-0'}
                        onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                        <CommandList>
                            <CommandGroup>
                                {suggestions.map((suggestion) => (
                                    <CommandItem
                                        key={suggestion.label}
                                        value={suggestion.label}
                                        onSelect={selectSuggestion}
                                    >
                                        {suggestion.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </PopoverContent>
                </Popover>
            </Command>
            {error && (
                <p className={'mt-1 text-xs text-destructive'}>
                    {error}
                </p>
            )}
        </div>
    )
}
