import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { MilestoneInput } from '@/types/goals'

import { milestoneSchema } from '@/validations/forms/goalSchema'

export const useMilestoneForm = ({
    onSubmit
}: {
    onSubmit: (data: MilestoneInput) => Promise<void>
}) => {
    const form = useForm<MilestoneInput>({
        resolver: zodResolver(
            milestoneSchema
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
