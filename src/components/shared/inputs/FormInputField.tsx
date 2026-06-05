import { ReactNode } from 'react'

import type {
    Control,
    ControllerRenderProps
} from 'react-hook-form'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'

import { cn } from '@/lib/utils'

type FormInputFieldProps = {
    control: Control<any>
    name: string
    label: string
    labelClassName?: string
    render: (field: ControllerRenderProps<any, any>) => ReactNode
}

export const FormInputField = ({
    control,
    name,
    label,
    labelClassName,
    render
}: FormInputFieldProps) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel className={cn(labelClassName)}>
                    {label}
                </FormLabel>
                <FormControl>
                    {render(field)}
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
    />
)
