import { LegalSection as LegalSectionType } from '@/types/legal'

import { LegalSectionBody } from './LegalSectionBody'

type LegalSectionProps = {
    section: LegalSectionType
    index: number
    registerSection: (el: HTMLElement | null) => void
}

export const LegalSection = ({
    section,
    index,
    registerSection
}: LegalSectionProps) => {
    return (
        <section
            ref={registerSection}
            className={'mb-10 scroll-mt-20'}
        >
            <h2 className={'mb-3.5 text-[22px] font-bold tracking-tight text-on-surface'}>
                <span className={'me-2 text-primary'}>{`${index + 1}.`}</span>
                {section.title}
            </h2>
            <LegalSectionBody blocks={section.body}/>
        </section>
    )
}
