'use client'

import { LegalDocument } from '@/components/legal/LegalDocument'

import { useLegalPageContent } from '@/hooks/legal/useLegalPageContent'

const PrivacyPage = () => {
    const {
        content,
        sections,
        pdfHref,
        tabs,
        updated
    } = useLegalPageContent('privacy')

    return (
        <LegalDocument
            content={content}
            sections={sections}
            updated={updated}
            pdfHref={pdfHref}
            tabs={tabs}
        />
    )
}

export default PrivacyPage
