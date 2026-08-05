'use client'

import { LegalDocument } from '@/components/legal/LegalDocument'

import { useLegalPageContent } from '@/hooks/legal/useLegalPageContent'

const PrivacyPage = () => {
    const {
        content,
        sections,
        tabs,
        updated
    } = useLegalPageContent('privacy')

    return (
        <LegalDocument
            content={content}
            sections={sections}
            updated={updated}
            tabs={tabs}
        />
    )
}

export default PrivacyPage
