import * as z from 'zod'

export const notificationsSettingsSchema = z.object({
    dailyReminder: z.boolean(),
    communityAlerts: z.boolean()
})

export type NotificationsSettingsSchema =
    z.infer<typeof notificationsSettingsSchema>

export const privacySettingsSchema = z.object({
    profileVisibility: z.enum([
        'onlyMe',
        'friends',
        'public'
    ]),
    anonymousParticipation: z.boolean()
})

export type PrivacySettingsSchema =
    z.infer<typeof privacySettingsSchema>

export const appPreferencesSchema = z.object({
    theme: z.enum([
        'light',
        'dark'
    ]),
    language: z.string()
})

export type AppPreferencesSchema =
    z.infer<typeof appPreferencesSchema>
