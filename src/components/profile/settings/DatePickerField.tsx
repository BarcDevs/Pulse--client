'use client'

import { format, parseISO } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { useUser } from '@/hooks/ui/useUser'
import { formatByUserPreference } from '@/lib/time'
import { cn } from '@/lib/utils'

type Props = {
    label: string
    value: string
    onChangeAction: (value: string) => void
}

export const DatePickerField = ({
    label,
    value,
    onChangeAction
}: Props) => {
    const { user } = useUser()
    const selected = value ? parseISO(value) : undefined

    const handleSelect = (date: Date | undefined) => {
        onChangeAction(date ? format(date, 'yyyy-MM-dd') : '')
    }

    return (
        <div>
            <p className={'label-uppercase label-rtl text-muted-foreground font-normal mb-2'}>
                {label}
            </p>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={cn(
                            'w-full justify-start text-left font-normal bg-muted',
                            !selected && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className={'mr-2 size-4'}/>
                        {selected
                            ? formatByUserPreference(
                                selected,
                                false,
                                user?.profile?.dateFormat
                            )
                            : '-'
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
                        captionLayout={'dropdown'}
                        disabled={(date) => date > new Date()}
                        defaultMonth={selected}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
