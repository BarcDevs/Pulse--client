'use client'

import { LegalDocument } from '@/components/legal/LegalDocument'

import { useLegalPageContent } from '@/hooks/legal/useLegalPageContent'

const TermsPage = () => {
    const {
        content,
        sections,
        pdfHref,
        tabs,
        updated
    } = useLegalPageContent('terms')

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

export default TermsPage
