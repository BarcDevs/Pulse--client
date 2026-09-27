'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Accordion } from '@/components/ui/accordion'

import { SUPPORT_FAQ_IDS } from '@/constants/support'

import { supportLocales } from '@/locales/supportLocales'

import { FaqItem } from './FaqItem'

export const SupportFaq = () => {
    const t = useTranslations()
    const [openId, setOpenId] = useState<string>(SUPPORT_FAQ_IDS[0])

    return (
        <>
            <h3 className={'mb-4 text-lg font-bold text-on-surface'}>
                {t(supportLocales.faq.title)}
            </h3>
            <Accordion
                type={'single'}
                collapsible
                value={openId}
                onValueChange={setOpenId}
                className={'mb-10 overflow-hidden rounded-[14px] border border-border bg-card'}
            >
                {SUPPORT_FAQ_IDS.map((id) => (
                    <FaqItem
                        key={id}
                        id={id}
                        isOpen={openId === id}
                        onFound={() => setOpenId(id)}
                    />
                ))}
            </Accordion>
        </>
    )
}
