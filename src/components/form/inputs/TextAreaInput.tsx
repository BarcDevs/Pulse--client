import { FieldValues } from 'react-hook-form'

import { FieldConfig } from '@/types/forms/forms'

import {
    FormControl,
    FormDescription,
    FormLabel
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

type TextAreaInputProps<T extends FieldValues> = {
    field: T
    config: FieldConfig
}

export const TextAreaInput = <T extends FieldValues>({
    field,
    config
}: TextAreaInputProps<T>) => (
    <>
        {config.label
            && <FormLabel>
                {config.label}
            </FormLabel>
        }
        <FormControl>
            <Textarea
                placeholder={config.placeholder}
                maxLength={config.maxLength}
                disabled={config.disabled}
                rows={config.rows || 4}
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
