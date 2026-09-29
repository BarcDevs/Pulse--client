'use client'

import { useTranslations } from 'next-intl'

import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { FieldValues } from 'react-hook-form'

import { FieldConfig } from '@/types/forms'

import {
    FormControl,
    FormLabel
} from '@/components/ui/form'
import { InputOTP } from '@/components/ui/input-otp'

import { OtpSlots } from './OtpSlots'

type OtpInputProps<T extends FieldValues> = {
    field: T
    config: FieldConfig
}

export const OtpInput = <T extends FieldValues>({
    field,
    config
}: OtpInputProps<T>) => {
    const t = useTranslations()
    const length = config.maxLength ?? 6

    return (
        <>
            {config.label
                && <FormLabel>
                    {t(config.label)}
                </FormLabel>
            }
            <div dir={'ltr'}>
                <FormControl>
                    <InputOTP
                        maxLength={length}
                        pattern={REGEXP_ONLY_DIGITS}
                        autoComplete={config.autoComplete}
                        disabled={config.disabled}
                        containerClassName={'grid grid-cols-6 gap-2 w-full'}
                        data-testid={field.name}
                        {...field}
                    >
                        <OtpSlots length={length}/>
                    </InputOTP>
                </FormControl>
            </div>
        </>
    )
}
