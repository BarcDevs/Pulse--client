import {
    ChangeEvent,
    InputHTMLAttributes,
    useState
} from 'react'

import { Eye, EyeOff } from 'lucide-react'

import { IconButton } from '@/components/shared/buttons/IconButton'
import { FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'

type FormInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange'
> & {
    id: string
    label?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = ({
    id,
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    required = true,
    className,
    ...rest
}: FormInputProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPasswordField = type === 'password'

    const inputType =
        isPasswordField && showPassword
            ? 'text'
            : type

    return (
        <div className={label ? 'space-y-2' : ''}>
            {label && (
                <FormLabel
                    htmlFor={id}
                    className={'text-xs font-medium uppercase tracking-wider text-muted-foreground'}
                >
                    {label}
                </FormLabel>
            )}
            <div className={'relative'}>
                <Input
                    id={id}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={className || cn(
                        'h-11 border-border bg-muted',
                        isPasswordField
                            ? 'pr-10'
                            : ''
                    )}
                    required={required}
                    {...rest}
                />
                {isPasswordField && (
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
                )}
            </div>
        </div>
    )
}
