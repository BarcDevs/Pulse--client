import { useTranslations } from 'next-intl'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { wrapFormSubmit } from '@/lib/forms/handleFormSubmit'

import {
    createOtpSchema,
    type OtpSchema
} from '@/validations/forms/otpSchema'

type UseConfirmEmailChangeFormProps = {
    onSubmit: (
        data: OtpSchema
    ) => Promise<void>
}

export const useConfirmEmailChangeForm = ({
    onSubmit
}: UseConfirmEmailChangeFormProps) => {
    const t = useTranslations()
    const form = useForm<OtpSchema>({
        resolver: zodResolver(
            createOtpSchema(t)
        ),
        defaultValues: { otp: '' },
        mode: 'onBlur'
    })

    const handleSubmit = wrapFormSubmit(
        form,
        onSubmit,
        { resetOnSuccess: true }
    )

    return {
        form,
        handleSubmit
    }
}
