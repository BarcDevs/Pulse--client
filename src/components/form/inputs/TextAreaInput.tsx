'use client'

import { useTranslations } from 'next-intl'

import { FieldValues } from 'react-hook-form'

import { FieldConfig } from '@/types/forms'

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
}: TextAreaInputProps<T>) => {
    const t = useTranslations()

    return (
        <>
            {config.label
                && <FormLabel>
                    {t(config.label)}
                </FormLabel>
            }
            <FormControl>
                <Textarea
                    placeholder={config.placeholder ? t(config.placeholder) : ''}
                    maxLength={config.maxLength}
                    disabled={config.disabled}
                    rows={config.rows || 4}
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
