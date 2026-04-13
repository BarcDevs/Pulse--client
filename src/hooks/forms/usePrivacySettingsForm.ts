import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
    type PrivacySettingsSchema,
    privacySettingsSchema
} from '@/validations/forms/settingsSchema'

export const usePrivacySettingsForm = () => {
    const form = useForm<PrivacySettingsSchema>({
        resolver: zodResolver(privacySettingsSchema),
        defaultValues: {
            profileVisibility: 'onlyMe',
            anonymousParticipation: true
        }
    })

    return { form }
}
