import { useTranslations } from 'next-intl'

import { LegalSection } from '@/types/legal'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

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
        <nav className={'sticky top-8 hidden md:block'}>
            <p className={'mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground'}>
                {t(legalLocales.common.toc.onThisPage)}
            </p>
            <div className={'flex flex-col gap-0.5'}>
                {sections.map((section, index) => (
                    <Button
                        key={section.id}
                        type={'button'}
                        variant={'ghost'}
                        onClick={() => onJumpTo(section.id)}
                        className={cn(
                            'h-auto w-full justify-start rounded-none border-s-2 px-3 py-1.5 text-start text-sm font-normal hover:bg-transparent',
                            activeId === section.id
                                ? 'border-primary font-semibold text-primary'
                                : 'border-transparent text-muted-foreground hover:text-on-surface'
                        )}
                    >
                        {`${index + 1}. ${section.title}`}
                    </Button>
                ))}
            </div>
        </nav>
    )
}
