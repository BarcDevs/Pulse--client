'use client'

import { LegalDocument } from '@/components/legal/LegalDocument'

import { useLegalPageContent } from '@/hooks/legal/useLegalPageContent'

const TermsPage = () => {
    const {
        content,
        sections,
        tabs,
        updated
    } = useLegalPageContent('terms')

    return (
        <LegalDocument
            content={content}
            sections={sections}
            updated={updated}
            tabs={tabs}
        />
    )
}

export default TermsPage
