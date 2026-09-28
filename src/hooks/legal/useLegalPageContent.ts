import {
    useLocale,
    useTranslations
} from 'next-intl'

import {
    Bookmark,
    Shield
} from 'lucide-react'

import {
    LegalDocumentContent,
    LegalSectionContentRaw
} from '@/types/legal'

import {
    PRIVACY_CALLOUT_TONES,
    PRIVACY_SECTION_IDS,
    PRIVACY_UPDATED_DATE,
    TERMS_CALLOUT_TONES,
    TERMS_SECTION_IDS,
    TERMS_UPDATED_DATE
} from '@/constants/legal'
import { ROUTES } from '@/constants/routes'

import { legalLocales } from '@/locales/legalLocales'

type LegalDocKey = 'privacy' | 'terms'

const SECTION_IDS_BY_DOC = {
    privacy: PRIVACY_SECTION_IDS,
    terms: TERMS_SECTION_IDS
}

const UPDATED_DATE_BY_DOC = {
    privacy: PRIVACY_UPDATED_DATE,
    terms: TERMS_UPDATED_DATE
}

const CALLOUT_TONES_BY_DOC = {
    privacy: PRIVACY_CALLOUT_TONES,
    terms: TERMS_CALLOUT_TONES
}

const KICKER_ICON_BY_DOC = {
    privacy: Shield,
    terms: Bookmark
}

export const useLegalPageContent = (docKey: LegalDocKey) => {
    const t = useTranslations()
    const locale = useLocale()
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
        kickerIcon: KICKER_ICON_BY_DOC[docKey],
        sections,
        tabs,
        pdfHref: `/legal/${docKey}-${locale}.pdf`,
        updated: new Intl.DateTimeFormat(
            locale,
            { dateStyle: 'long' }
        ).format(new Date(UPDATED_DATE_BY_DOC[docKey]))
    }
}
