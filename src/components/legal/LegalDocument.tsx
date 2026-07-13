'use client'

import { useTranslations } from 'next-intl'

import {
    LegalDocumentContent,
    LegalSection as LegalSectionType
} from '@/types/legal'

import { Footer } from '@/components/shared/footer/Footer'
import { PageHeader } from '@/components/shared/PageHeader'

import { useLegalScrollSpy } from '@/hooks/legal/useLegalScrollSpy'

import { legalLocales } from '@/locales/legalLocales'

import { LegalFooterCta } from './LegalFooterCta'
import { LegalMetaBar } from './LegalMetaBar'
import { LegalSection } from './LegalSection'
import { LegalToc } from './LegalToc'

type LegalDocumentProps = {
    content: LegalDocumentContent
    sections: LegalSectionType[]
    updated: string
    tabs: { label: string; href: string }[]
}

export const LegalDocument = ({
    content,
    sections,
    updated,
    tabs
}: LegalDocumentProps) => {
    const t = useTranslations()
    const sectionIds = sections.map((section) => section.id)
    const {
        activeId,
        scrollerRef,
        registerSection,
        jumpTo
    } = useLegalScrollSpy(sectionIds)

    return (
        <div
            ref={scrollerRef}
            className={'flex flex-1 flex-col overflow-y-auto bg-surface-page'}
        >
            <div className={'px-4 pt-6 md:px-8'}>
                <PageHeader
                    title={content.title}
                    subtitle={content.subtitle}
                    kicker={content.kicker}
                    tabs={tabs}
                    backLabel={t(legalLocales.common.backLabel)}
                />
            </div>

            <LegalMetaBar updated={updated}/>

            <div className={'mx-auto w-full max-w-5xl px-4 pt-8 md:px-8'}>
                <div className={'grid grid-cols-1 items-start gap-8 md:grid-cols-[220px_1fr] md:gap-10'}>
                    <LegalToc
                        sections={sections}
                        activeId={activeId}
                        onJumpTo={jumpTo}
                    />

                    <article className={'max-w-2xl'}>
                        {sections.map((section, index) => (
                            <LegalSection
                                key={section.id}
                                section={section}
                                index={index}
                                registerSection={registerSection(section.id)}
                            />
                        ))}

                        <LegalFooterCta/>
                    </article>
                </div>
            </div>

            <Footer/>
        </div>
    )
}
