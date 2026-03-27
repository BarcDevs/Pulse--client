import {FieldValues} from 'react-hook-form'

import {FieldConfig} from '@/types/forms'

import {
    FormControl,
    FormDescription,
    FormLabel
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'

type EmailInputProps<T extends FieldValues> = {
    field: T
    config: FieldConfig
}

export const EmailInput = <T extends FieldValues> ({
    field,
    config
}: EmailInputProps<T>) => (
    <>
        {config.label &&
            <FormLabel>
                {config.label}
            </FormLabel>}
        <FormControl>
            <Input
                type={'email'}
                placeholder={config.placeholder}
                disabled={config.disabled}
                autoComplete={'email'}
                {...field}
            />
        </FormControl>
        {config.description && (
            <FormDescription>
                {config.description}
            </FormDescription>
        )}
    </>
)
