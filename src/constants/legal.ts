import { LegalCalloutTone } from '@/types/legal'

export const PRIVACY_UPDATED_DATE = '2026-09-23'
export const TERMS_UPDATED_DATE = '2026-04-28'

export const PRIVACY_CALLOUT_TONES: LegalCalloutTone[] = ['info']
export const TERMS_CALLOUT_TONES: LegalCalloutTone[] = ['warn']

export const PRIVACY_SECTION_IDS = [
    'overview',
    'data-we-collect',
    'cookies',
    'how-we-use',
    'sharing',
    'security',
    'your-rights',
    'retention',
    'children',
    'changes'
] as const

export const TERMS_SECTION_IDS = [
    'agreement',
    'eligibility',
    'your-account',
    'medical',
    'community',
    'content',
    'subscriptions',
    'termination',
    'liability',
    'changes',
    'contact'
] as const
