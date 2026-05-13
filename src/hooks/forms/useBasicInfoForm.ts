import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { wrapFormSubmit } from '@/lib/forms/handleFormSubmit'

import {
    BasicInfoSchema,
    basicInfoSchema
} from '@/validations/forms/basicInfoSchema'

type UseBasicInfoFormProps = {
    onSubmit: (data: BasicInfoSchema) => Promise<void>
    defaultValues?: Partial<BasicInfoSchema>
}

export const useBasicInfoForm = ({
    onSubmit,
    defaultValues
}: UseBasicInfoFormProps) => {
    const form = useForm<BasicInfoSchema>({
        resolver: zodResolver(basicInfoSchema),
        defaultValues: {
            firstName: defaultValues?.firstName,
            lastName: defaultValues?.lastName,
            location: defaultValues?.location
        },
        mode: 'onBlur'
    })

    const handleSubmit = wrapFormSubmit(
        form,
        onSubmit,
        {
            fallbackMessage: 'Failed to save changes'
        })

    return {
        form,
        handleSubmit
    }
}
