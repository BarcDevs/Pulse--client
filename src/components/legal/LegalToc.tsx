import { useTranslations } from 'next-intl'

import { LegalSection } from '@/types/legal'

import { TabButton } from '@/components/shared/buttons/TabButton'

import { legalLocales } from '@/locales/legalLocales'

type LegalTocProps = {
    sections: LegalSection[]
    activeId: string
    onJumpTo: (id: string) => void
}

export const LegalToc = ({
    sections,
    activeId,
    onJumpTo
}: LegalTocProps) => {
    const t = useTranslations()

    return (
        <nav className={'sticky below-header hidden md:block print:hidden'}>
            <p className={'mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground'}>
                {t(legalLocales.common.toc.onThisPage)}
            </p>
            <div className={'flex flex-col gap-0.5'}>
                {sections.map((section, index) => (
                    <TabButton
                        key={section.id}
                        type={'button'}
                        variant={'side'}
                        isActive={activeId === section.id}
                        onClick={() => onJumpTo(section.id)}
                    >
                        {`${index + 1}. ${section.title}`}
                    </TabButton>
                ))}
            </div>
        </nav>
    )
}
