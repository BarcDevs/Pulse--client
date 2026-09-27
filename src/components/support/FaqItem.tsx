import { useTranslations } from 'next-intl'

import { ChevronDown } from 'lucide-react'

import { FoldablePanel } from '@/components/shared/content/FoldablePanel'
import { RichText } from '@/components/shared/content/RichText'
import {
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'

import { SUPPORT_FAQ_IDS } from '@/constants/support'

import { supportLocales } from '@/locales/supportLocales'

type FaqItemProps = {
    id: typeof SUPPORT_FAQ_IDS[number]
    isOpen: boolean
    onFound: () => void
}

export const FaqItem = ({
    id,
    isOpen,
    onFound
}: FaqItemProps) => {
    const t = useTranslations()
    const item = supportLocales.faq.items[id]

    return (
        <AccordionItem
            value={id}
            className={'border-border'}
        >
            <AccordionTrigger className={'group cursor-pointer items-center px-[22px] py-[18px] text-[14.5px] font-semibold text-on-surface hover:no-underline [&>svg]:hidden'}>
                <span className={'pe-4'}>
                    {t(item.q)}
                </span>
                <div className={'flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-all group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground'}>
                    <ChevronDown className={'size-3 transition-transform duration-200 group-data-[state=open]:rotate-180'}/>
                </div>
            </AccordionTrigger>
            <FoldablePanel
                open={isOpen}
                onFound={onFound}
                className={'px-[22px]'}
            >
                <p className={'max-w-[720px] pb-[22px] text-sm leading-[1.7] text-muted-foreground'}>
                    <RichText text={t.raw(item.a) as string}/>
                </p>
            </FoldablePanel>
        </AccordionItem>
    )
}
