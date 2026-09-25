'use client'

import {
    useState
} from 'react'

import { useTranslations } from 'next-intl'

import {
    Eye,
    EyeOff
} from 'lucide-react'
import type { FieldValues } from 'react-hook-form'

import { FieldConfig } from '@/types/forms'

import { IconButton } from '@/components/shared/buttons/IconButton'
import {
    FormControl,
    FormDescription,
    FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'

type PasswordInputProps<T extends FieldValues> = {
    field: T
    config: FieldConfig
}

export const PasswordInput = <T extends FieldValues>({
    field,
    config
}: PasswordInputProps<T>) => {
    const t = useTranslations()
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            {config.label
                && <FormLabel>
                    {t(config.label)}
                </FormLabel>}
            <FormControl>
                <div className={'relative'}>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={config.placeholder ?? ''}
                        disabled={config.disabled}
                        autoComplete={'current-password'}
                        className={cn('pr-10', config.className)}
                        data-testid={field.name}
                        {...field}
                    />
                    <IconButton
                        type={'button'}
                        size={'sm'}
                        onClick={() => setShowPassword(!showPassword)}
                        className={'absolute right-1 top-1/2 -translate-y-1/2'}
                    >
                        {showPassword
                            ? <EyeOff className={'size-5'}/>
                            : <Eye className={'size-5'}/>
                        }
                    </IconButton>
                </div>
            </FormControl>
            {config.description && (
                <FormDescription>
                    {t(config.description)}
                </FormDescription>
            )}
        </>
    )
}
