export const SUPPORT_TOPIC_IDS = [
    'account',
    'billing',
    'technical',
    'privacy',
    'careTeam',
    'feedback',
    'other'
] as const

export type SupportTopicId = typeof SUPPORT_TOPIC_IDS[number]

export const SUPPORT_MESSAGE_MAX_LENGTH = 2000

export const SUPPORT_EMAIL_PLACEHOLDER = 'name@example.com'

export const SUPPORT_FAQ_IDS = [
    'privacy',
    'missedCheckIn',
    'shareProgress',
    'ai',
    'crisis',
    'deleteData'
] as const

export const SUPPORT_CONTACT_ANCHOR = 'contact'
