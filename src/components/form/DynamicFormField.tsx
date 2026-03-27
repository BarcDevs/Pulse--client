import {
    Control,
    FieldValues,
    Path
} from 'react-hook-form'

import {FieldConfig} from '@/types/forms'

import {
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'

import {CheckboxInput} from './inputs/CheckboxInput'
import {EmailInput} from './inputs/EmailInput'
import {PasswordInput} from './inputs/PasswordInput'
import {RadioInput} from './inputs/RadioInput'
import {SelectInput} from './inputs/SelectInput'
import {SliderInput} from './inputs/SliderInput'
import {TextAreaInput} from './inputs/TextAreaInput'
import {TextInput} from './inputs/TextInput'

type DynamicFormFieldProps<T extends FieldValues> = {
    name: Path<T>
    control: Control<T>
    config: FieldConfig
}

const inputComponentMap = {
    text: TextInput,
    email: EmailInput,
    password: PasswordInput,
    textarea: TextAreaInput,
    checkbox: CheckboxInput,
    select: SelectInput,
    radio: RadioInput,
    slider: SliderInput,
    otp: TextInput
}

export const DynamicFormField = <T extends FieldValues> ({
    name,
    control,
    config
}: DynamicFormFieldProps<T>) => {
    const InputComponent =
        inputComponentMap[config.type as keyof typeof inputComponentMap]

    if (!InputComponent) {
        return null
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <InputComponent
                        field={field}
                        config={config}
                    />
                    {fieldState.error && (
                        <FormMessage>
                            {fieldState.error.message}
                        </FormMessage>
                    )}
                </FormItem>
            )}
        />
    )
}
