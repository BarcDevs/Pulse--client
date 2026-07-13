import { useTranslations } from 'next-intl'

import {
    LegalDocumentContent,
    LegalSectionContent
} from '@/types/legal'

import {
    LEGAL_UPDATED_DATE,
    PRIVACY_SECTION_IDS,
    TERMS_SECTION_IDS
} from '@/constants/legal'
import { ROUTES } from '@/constants/routes'

import { legalLocales } from '@/locales/legalLocales'

type LegalDocKey = 'privacy' | 'terms'

const SECTION_IDS_BY_DOC = {
    privacy: PRIVACY_SECTION_IDS,
    terms: TERMS_SECTION_IDS
}

export const useLegalPageContent = (docKey: LegalDocKey) => {
    const t = useTranslations()
    const { sections: sectionContents, ...content } =
        t.raw(`legal.${docKey}`) as LegalDocumentContent & {
        sections: LegalSectionContent[]
    }

    const sectionIds = SECTION_IDS_BY_DOC[docKey]
    const sections = sectionContents.map((section, index) => ({
        ...section,
        id: sectionIds[index]
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
