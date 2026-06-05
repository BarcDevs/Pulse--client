import { useTranslations } from 'next-intl'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { MilestoneInput } from '@/types/goals'

import { createMilestoneSchema } from '@/validations/forms/goalSchema'

export const useMilestoneForm = ({
    onSubmit
}: {
    onSubmit: (
        data: MilestoneInput
    ) => Promise<void>
}) => {
    const t = useTranslations()
    const form = useForm<MilestoneInput>({
        resolver: zodResolver(
            createMilestoneSchema(t)
        ),
        defaultValues: {
            title: '',
            description: ''
        }
    })

    const handleSubmit = form.handleSubmit(
        onSubmit
    )

    return {
        form,
        handleSubmit
    }
}
