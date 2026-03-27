import {FieldValues} from 'react-hook-form'

import {FieldConfig} from '@/types/forms'

import {
    FormControl,
    FormDescription,
    FormLabel
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

type SelectInputProps<T extends FieldValues> = {
    field: T
    config: FieldConfig
}

export const SelectInput = <T extends FieldValues>({
    field,
    config
}: SelectInputProps<T>) => (
    <>
        {config.label &&
            <FormLabel>
                {config.label}
            </FormLabel>
        }
        <FormControl>
            <Select
                value={field.value || ''}
                onValueChange={field.onChange}
                disabled={config.disabled}
            >
                <SelectTrigger>
                    <SelectValue placeholder={config.placeholder}/>
                </SelectTrigger>
                <SelectContent>
                    {config.options?.map(option => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </FormControl>
        {config.description && (
            <FormDescription>
                {config.description}
            </FormDescription>
        )}
    </>
)
