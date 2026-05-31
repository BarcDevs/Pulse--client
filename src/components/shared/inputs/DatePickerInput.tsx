'use client'

import { useState } from 'react'

import { format, parseISO } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'

import { formatByUserPreference } from '@/lib/time'
import { cn } from '@/lib/utils'

type DatePickerInputProps = {
    value?: string
    onChangeAction: (value: string) => void
    onBlur?: () => void
    placeholder?: string
    disabled?: boolean
}

export const DatePickerInput = ({
    value,
    onChangeAction,
    onBlur,
    placeholder = 'Pick a date',
    disabled = false
}: DatePickerInputProps) => {
    const [open, setOpen] = useState(false)

    const selected = value ? parseISO(value) : undefined
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const handleSelect = (date: Date | undefined) => {
        onChangeAction(date ? format(date, 'yyyy-MM-dd') : '')
        onBlur?.()
        setOpen(false)
    }

    const handleOpenChange = (next: boolean) => {
        if (!next) onBlur?.()
        setOpen(next)
    }

    return (
        <Popover
            open={open}
            onOpenChange={handleOpenChange}
        >
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    disabled={disabled}
                    className={cn(
                        'w-full justify-start text-left font-normal bg-surface-container-low border-input',
                        !selected && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className={'mr-2 size-4'}/>
                    {selected
                        ? formatByUserPreference(selected)
                        : placeholder
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={'w-auto p-0'}
                align={'start'}
            >
                <Calendar
                    mode={'single'}
                    selected={selected}
                    onSelect={handleSelect}
                    disabled={{ before: today }}
                    defaultMonth={selected ?? today}
                    autoFocus
                />
            </PopoverContent>
        </Popover>
    )
}
