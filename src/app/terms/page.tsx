'use client'

import { LegalDocument } from '@/components/legal/LegalDocument'

import { useLegalPageContent } from '@/hooks/legal/useLegalPageContent'

const TermsPage = () => {
    const {
        content,
        kickerIcon,
        sections,
        pdfHref,
        tabs,
        updated
    } = useLegalPageContent('terms')

    return (
        <LegalDocument
            content={content}
            kickerIcon={kickerIcon}
            sections={sections}
            updated={updated}
            pdfHref={pdfHref}
            tabs={tabs}
        />
    )
}

export default TermsPage
