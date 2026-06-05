'use client'

import {
    type ComponentProps,
    useState
} from 'react'

import { useTranslations } from 'next-intl'

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

import { globalLocales } from '@/locales/globalLocales'

type DatePickerInputProps = {
    value?: string
    onChangeAction: (value: string) => void
    onBlurAction?: () => void
    placeholder?: string
    disabled?: boolean
    disabledDates?: ComponentProps<typeof Calendar>['disabled']
}

export const DatePickerInput = ({
    value,
    onChangeAction,
    onBlurAction,
    placeholder,
    disabled = false,
    disabledDates
}: DatePickerInputProps) => {
    const t = useTranslations()
    const [open, setOpen] = useState(false)

    const selected = value ? parseISO(value) : undefined
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const handleSelect = (date: Date | undefined) => {
        onChangeAction(date ? format(date, 'yyyy-MM-dd') : '')
        onBlurAction?.()
        setOpen(false)
    }

    const handleOpenChange = (next: boolean) => {
        if (!next) onBlurAction?.()
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
                        : (placeholder ?? t(globalLocales.shared.pickDate))
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
                    disabled={disabledDates ?? { before: today }}
                    defaultMonth={selected ?? today}
                    autoFocus
                />
            </PopoverContent>
        </Popover>
    )
}
