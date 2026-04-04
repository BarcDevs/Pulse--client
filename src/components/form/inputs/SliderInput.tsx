import { FieldValues } from 'react-hook-form'

import { FieldConfig } from '@/types/forms/forms'

import {
    FormControl,
    FormDescription,
    FormLabel
} from '@/components/ui/form'
import { Slider } from '@/components/ui/slider'

type SliderInputProps<T extends FieldValues> = {
    field: T
    config: FieldConfig
}

export const SliderInput = <T extends FieldValues>({
    field,
    config
}: SliderInputProps<T>) => (
    <>
        {config.label
            && <FormLabel>
                {config.label}
            </FormLabel>
        }
        <FormControl>
            <Slider
                value={[field.value || (config.min ?? 0)]}
                onValueChange={(value) =>
                    field.onChange(value[0])}
                disabled={config.disabled}
                min={config.min ?? 0}
                max={config.max ?? 100}
                step={config.step ?? 1}
                className={'w-full'}
            />
        </FormControl>
        {config.description && (
            <FormDescription>
                {config.description}
            </FormDescription>
        )}
    </>
)
