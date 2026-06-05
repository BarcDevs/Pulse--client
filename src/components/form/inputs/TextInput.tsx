'use client'

import { useTranslations } from 'next-intl'

import { FieldValues } from 'react-hook-form'

import { FieldConfig } from '@/types/forms'

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
}: TextInputProps<T>) => {
    const t = useTranslations()

    return (
        <>
            {config.label
                && <FormLabel>
                    {t(config.label)}
                </FormLabel>
            }
            <FormControl>
                <Input
                    type={'text'}
                    placeholder={config.placeholder ? t(config.placeholder) : ''}
                    maxLength={config.maxLength}
                    disabled={config.disabled}
                    {...field}
                />
            </FormControl>
            {config.description && (
                <FormDescription>
                    {t(config.description)}
                </FormDescription>
            )}
        </>
    )
}
