import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

type SelectInputProps = {
    // Generic form helper accepts any form type to avoid strict typing conflicts
    control: any
    name: string
    label: string
    placeholder: string
    options: Array<{
        value: string
        label: string
    }>
}

export const SelectInput = ({
    control,
    name,
    label,
    placeholder,
    options
}: SelectInputProps) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    {label}
                </FormLabel>
                <Select
                    value={field.value}
                    onValueChange={field.onChange}
                >
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder}/>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                className={'cursor-pointer'}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage/>
            </FormItem>
        )}
    />
)
