import {
    useState
} from 'react'

import {
    Eye,
    EyeOff
} from 'lucide-react'
import {FieldValues} from 'react-hook-form'

import {FieldConfig} from '@/types/forms'

import {Button} from '@/components/ui/button'
import {
    FormControl,
    FormDescription,
    FormLabel
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'

type PasswordInputProps<T extends FieldValues> = {
    field: T
    config: FieldConfig
}

export const PasswordInput = <T extends FieldValues>({
    field,
    config
}: PasswordInputProps<T>) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            {config.label &&
                <FormLabel>
                    {config.label}
                </FormLabel>}
            <FormControl>
                <div className={'relative'}>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={config.placeholder}
                        disabled={config.disabled}
                        autoComplete={'current-password'}
                        className={'pr-10'}
                        {...field}
                    />
                    <Button
                        type={'button'}
                        variant={'ghost'}
                        size={'sm'}
                        onClick={() => setShowPassword(!showPassword)}
                        className={'absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0 text-muted-foreground hover:bg-transparent'}
                    >
                        {showPassword ?
                            <EyeOff className={'size-5'}/> :
                            <Eye className={'size-5'}/>
                        }
                    </Button>
                </div>
            </FormControl>
            {config.description && (
                <FormDescription>
                    {config.description}
                </FormDescription>
            )}
        </>
    )
}
