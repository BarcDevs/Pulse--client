import {FieldValues} from 'react-hook-form'

import {FieldConfig} from '@/types/forms/forms'

import {
    FormControl,
    FormDescription,
    FormLabel
} from '@/components/ui/form'
import {
    RadioGroup,
    RadioGroupItem
} from '@/components/ui/radio-group'

type RadioInputProps<T extends FieldValues> = {
    field: T
    config: FieldConfig
}

export const RadioInput = <T extends FieldValues>({
    field,
    config
}: RadioInputProps<T>) => (
    <>
        {config.label &&
            <FormLabel>
                {config.label}
            </FormLabel>
        }
        <FormControl>
            <RadioGroup
                value={field.value || ''}
                onValueChange={field.onChange}
                disabled={config.disabled}
            >
                {config.options?.map(option => (
                    <div
                        key={option.value}
                        className={'flex items-center space-x-2'}
                    >
                        <RadioGroupItem
                            value={option.value}
                            id={option.value}
                        />
                        <FormLabel htmlFor={option.value}>
                            {option.label}
                        </FormLabel>
                    </div>
                ))}
            </RadioGroup>
        </FormControl>
        {config.description && (
            <FormDescription>
                {config.description}
            </FormDescription>
        )}
    </>
)
