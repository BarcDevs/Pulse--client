import { useTranslations } from 'next-intl'

import { Accordion } from '@/components/ui/accordion'

import { SUPPORT_FAQ_IDS } from '@/constants/support'

import { supportLocales } from '@/locales/supportLocales'

import { FaqItem } from './FaqItem'

export const SupportFaq = () => {
    const t = useTranslations()

    return (
        <>
            <h3 className={'mb-4 text-lg font-bold text-on-surface'}>
                {t(supportLocales.faq.title)}
            </h3>
            <Accordion
                type={'single'}
                collapsible
                defaultValue={SUPPORT_FAQ_IDS[0]}
                className={'mb-10 overflow-hidden rounded-[14px] border border-border bg-card'}
            >
                {SUPPORT_FAQ_IDS.map((id) => (
                    <FaqItem
                        key={id}
                        id={id}
                    />
                ))}
            </Accordion>
        </>
    )
}
