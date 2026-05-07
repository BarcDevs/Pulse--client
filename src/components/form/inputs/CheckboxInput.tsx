'use client'

import { useTranslations } from 'next-intl'

import { FieldValues } from 'react-hook-form'

import { FieldConfig } from '@/types/forms'

import { Checkbox } from '@/components/ui/checkbox'
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
}: CheckboxInputProps<T>) => {
    const t = useTranslations()

    return (
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
                    {t(config.label)}
                </FormLabel>
            )}
            {config.description && (
                <FormDescription>
                    {t(config.description)}
                </FormDescription>
            )}
        </div>
    )
}
