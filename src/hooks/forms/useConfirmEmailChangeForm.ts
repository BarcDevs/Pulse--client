import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { wrapFormSubmit } from '@/lib/forms/handleFormSubmit'

import {
    type OtpSchema,
    otpSchema } from '@/validations/forms/otpSchema'

type UseConfirmEmailChangeFormProps = {
    onSubmit: (data: OtpSchema) => Promise<void>
}

export const useConfirmEmailChangeForm = ({
    onSubmit
}: UseConfirmEmailChangeFormProps) => {
    const form = useForm<OtpSchema>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: '' },
        mode: 'onBlur'
    })

    const handleSubmit = wrapFormSubmit(
        form,
        onSubmit,
        { resetOnSuccess: true }
    )

    return { form, handleSubmit }
}
