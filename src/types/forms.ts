import type {
    FieldValues,
    UseFormSetValue,
    UseFormWatch
} from 'react-hook-form'

export type FormControlProps<
    TSchema extends FieldValues
> = {
    watch: UseFormWatch<TSchema>
    setValueAction: UseFormSetValue<TSchema>
}
