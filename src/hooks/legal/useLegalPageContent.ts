import { useTranslations } from 'next-intl'

import {
    LegalDocumentContent,
    LegalSectionContentRaw
} from '@/types/legal'

import {
    LEGAL_UPDATED_DATE,
    PRIVACY_CALLOUT_TONES,
    PRIVACY_SECTION_IDS,
    TERMS_CALLOUT_TONES,
    TERMS_SECTION_IDS
} from '@/constants/legal'
import { ROUTES } from '@/constants/routes'

import { legalLocales } from '@/locales/legalLocales'

type LegalDocKey = 'privacy' | 'terms'

const SECTION_IDS_BY_DOC = {
    privacy: PRIVACY_SECTION_IDS,
    terms: TERMS_SECTION_IDS
}

const CALLOUT_TONES_BY_DOC = {
    privacy: PRIVACY_CALLOUT_TONES,
    terms: TERMS_CALLOUT_TONES
}

export const useLegalPageContent = (docKey: LegalDocKey) => {
    const t = useTranslations()
    const { sections: sectionContents, ...content } =
        t.raw(`legal.${docKey}`) as LegalDocumentContent & {
        sections: LegalSectionContentRaw[]
    }

    const sectionIds = SECTION_IDS_BY_DOC[docKey]
    const calloutTones = CALLOUT_TONES_BY_DOC[docKey]
    let calloutIndex = 0

    const sections = sectionContents.map((section, index) => ({
        ...section,
        id: sectionIds[index],
        body: section.body.map((block) => {
            if (typeof block !== 'string' && 'callout' in block) {
                return { ...block, tone: calloutTones[calloutIndex++] }
            }
            return block
        })
    }))

    const tabs = [
        { label: t(legalLocales.tabs.privacy), href: ROUTES.PRIVACY },
        { label: t(legalLocales.tabs.terms), href: ROUTES.TERMS }
    ]

    return {
        content,
        sections,
        tabs,
        updated: LEGAL_UPDATED_DATE
    }
}
