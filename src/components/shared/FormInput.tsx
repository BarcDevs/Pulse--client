import {
    ChangeEvent,
    InputHTMLAttributes,
    useState,
} from 'react'

import { Eye, EyeOff } from 'lucide-react'

import { Input } from '@/components/ui/input'

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
                <label
                    htmlFor={id}
                    className={'text-xs font-medium uppercase tracking-wider text-muted-foreground'}
                >
                    {label}
                </label>
            )}
            <div className={'relative'}>
                <Input
                    id={id}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={className || `h-11 border-border bg-muted ${isPasswordField ? 'pr-10' : ''}`}
                    required={required}
                    {...rest}
                />
                {isPasswordField && (
                    <button
                        type={'button'}
                        onClick={() => setShowPassword(!showPassword)}
                        className={'absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'}
                    >
                        {showPassword ? (
                            <EyeOff className={'size-5'} />
                        ) : (
                            <Eye className={'size-5'} />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}
