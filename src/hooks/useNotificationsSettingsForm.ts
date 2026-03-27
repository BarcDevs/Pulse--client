import {useForm} from 'react-hook-form'

import {zodResolver} from '@hookform/resolvers/zod'

import {
    type NotificationsSettingsSchema,
    notificationsSettingsSchema} from '@/validations/forms/settingsSchema'

export const useNotificationsSettingsForm = () => {
    const form = useForm<NotificationsSettingsSchema>({
        resolver: zodResolver(notificationsSettingsSchema),
        defaultValues: {
            dailyReminder: true,
            communityAlerts: false
        }
    })

    return {form}
}
