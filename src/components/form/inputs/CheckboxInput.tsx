import {FieldValues} from 'react-hook-form'

import {FieldConfig} from '@/types/forms/forms'

import {Checkbox} from '@/components/ui/checkbox'
import {
    FormControl,
    FormDescription,
    FormLabel
} from '@/components/ui/form'

type CheckboxInputProps<T extends FieldValues> = {
    field: T
    config: FieldConfig
}

export const CheckboxInput = <T extends FieldValues>({
    field,
    config
}: CheckboxInputProps<T>) => (
    <div className={'flex items-center space-x-2'}>
        <FormControl>
            <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={config.disabled}
                id={config.label}
            />
        </FormControl>
        {config.label && (
            <FormLabel htmlFor={config.label}>
                {config.label}
            </FormLabel>
        )}
        {config.description && (
            <FormDescription>
                {config.description}
            </FormDescription>
        )}
    </div>
)
