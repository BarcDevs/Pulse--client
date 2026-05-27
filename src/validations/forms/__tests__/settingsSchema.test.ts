import {
    describe,
    expect,
    it
} from 'vitest'

import {
    appPreferencesSchema,
    notificationsSettingsSchema,
    privacySettingsSchema
} from '@/validations/forms/settingsSchema'

describe('notificationsSettingsSchema', () => {
    it('accepts valid data', () => {
        expect(notificationsSettingsSchema.safeParse({
            dailyReminder: true,
            communityAlerts: false
        }).success).toBe(true)
    })

    it('rejects non-boolean values', () => {
        expect(notificationsSettingsSchema.safeParse({
            dailyReminder: 'yes',
            communityAlerts: false
        }).success).toBe(false)
    })

    it('rejects missing fields', () => {
        expect(notificationsSettingsSchema.safeParse({ dailyReminder: true }).success).toBe(false)
    })
})

describe('privacySettingsSchema', () => {
    it.each(['onlyMe', 'friends', 'public'])(
        'accepts profileVisibility: %s',
        (visibility) => {
            expect(privacySettingsSchema.safeParse({
                profileVisibility: visibility,
                anonymousParticipation: false
            }).success).toBe(true)
        }
    )

    it('rejects invalid profileVisibility', () => {
        expect(privacySettingsSchema.safeParse({
            profileVisibility: 'everyone',
            anonymousParticipation: false
        }).success).toBe(false)
    })

    it('rejects non-boolean anonymousParticipation', () => {
        expect(privacySettingsSchema.safeParse({
            profileVisibility: 'public',
            anonymousParticipation: 'yes'
        }).success).toBe(false)
    })
})

describe('appPreferencesSchema', () => {
    it('accepts light theme', () => {
        expect(appPreferencesSchema.safeParse({ theme: 'light', language: 'en-US' }).success).toBe(true)
    })

    it('accepts dark theme', () => {
        expect(appPreferencesSchema.safeParse({ theme: 'dark', language: 'he-IL' }).success).toBe(true)
    })

    it('rejects invalid theme', () => {
        expect(appPreferencesSchema.safeParse({ theme: 'system', language: 'en-US' }).success).toBe(false)
    })

    it('accepts any string for language', () => {
        expect(appPreferencesSchema.safeParse({ theme: 'light', language: 'ja-JP' }).success).toBe(true)
    })
})
