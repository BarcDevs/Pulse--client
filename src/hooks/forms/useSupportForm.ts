import { useTranslations } from 'next-intl'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { wrapFormSubmit } from '@/lib/forms/handleFormSubmit'

import {
    createSupportSchema,
    type SupportSchema
} from '@/validations/forms/supportSchema'

type UseSupportFormProps = {
    requireEmail: boolean
    onSubmit: (data: SupportSchema) => Promise<void>
}

export const useSupportForm = ({
    requireEmail,
    onSubmit
}: UseSupportFormProps) => {
    const t = useTranslations()
    const form = useForm<SupportSchema>({
        resolver: zodResolver(createSupportSchema(t, requireEmail)),
        defaultValues: {
            topic: 'account',
            message: '',
            email: ''
        },
        mode: 'onBlur'
    })

    const handleSubmit = wrapFormSubmit(
        form,
        onSubmit,
        { resetOnSuccess: true, t }
    )

    return { form, handleSubmit }
}
