'use client'

import type { Control } from 'react-hook-form'

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from '@/components/ui/input-otp'

import type { OtpSchema } from '@/validations/forms/otpSchema'

type Props = {
    control: Control<OtpSchema>
}

export const OtpCodeField = ({ control }: Props) => (
    <FormField
        name={'otp'}
        control={control}
        render={({ field }) => (
            <FormItem>
                <FormControl>
                    <InputOTP
                        maxLength={6}
                        {...field}
                    >
                        <InputOTPGroup>
                            {Array.from({ length: 6 }, (_, i) => (
                                <InputOTPSlot
                                    key={i}
                                    index={i}
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
    />
)
