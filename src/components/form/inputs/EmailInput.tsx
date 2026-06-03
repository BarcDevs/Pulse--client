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

import { cn } from '@/lib/utils'

type EmailInputProps<T extends FieldValues> = {
    field: T
    config: FieldConfig
}

export const EmailInput = <T extends FieldValues> ({
    field,
    config
}: EmailInputProps<T>) => {
    const t = useTranslations()

    return (
        <>
            {config.label
                && <FormLabel>
                    {t(config.label)}
                </FormLabel>}
            <FormControl>
                <Input
                    type={'email'}
                    placeholder={config.placeholder}
                    disabled={config.disabled}
                    autoComplete={'email'}
                    className={cn(config.className)}
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
