import { FieldValues } from 'react-hook-form'

import { FieldConfig } from '@/types/forms/forms'

import {
    FormControl,
    FormDescription,
    FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type TextInputProps<T extends FieldValues> = {
    field: T
    config: FieldConfig
}

export const TextInput = <T extends FieldValues>({
    field,
    config
}: TextInputProps<T>) => (
    <>
        {config.label
            && <FormLabel>
                {config.label}
            </FormLabel>
        }
        <FormControl>
            <Input
                type={'text'}
                placeholder={config.placeholder}
                maxLength={config.maxLength}
                disabled={config.disabled}
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
