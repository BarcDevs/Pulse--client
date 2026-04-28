import type { Control, ControllerRenderProps } from 'react-hook-form'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'

type FormInputFieldProps = {
    control: Control<any>
    name: string
    label: string
    render: (field: ControllerRenderProps<any, any>) => React.ReactNode
}

export const FormInputField = ({
    control,
    name,
    label,
    render
}: FormInputFieldProps) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>
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
