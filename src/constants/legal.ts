import { LegalCalloutTone } from '@/types/legal'

export const LEGAL_UPDATED_DATE = 'April 28, 2026'

export const PRIVACY_CALLOUT_TONES: LegalCalloutTone[] = ['info']
export const TERMS_CALLOUT_TONES: LegalCalloutTone[] = ['warn']

export const PRIVACY_SECTION_IDS = [
    'overview',
    'data-we-collect',
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
    'governing-law',
    'contact'
] as const
