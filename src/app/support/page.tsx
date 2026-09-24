'use client'

import { useTranslations } from 'next-intl'

import { Footer } from '@/components/shared/footer/Footer'
import { PageHeader } from '@/components/shared/PageHeader'
import { QuickHelpCards } from '@/components/support/QuickHelpCards'
import { SupportContact } from '@/components/support/SupportContact'
import { SupportFaq } from '@/components/support/SupportFaq'
import { SupportSearch } from '@/components/support/SupportSearch'
import { TopicCards } from '@/components/support/TopicCards'

import { FEATURES } from '@/config/features'

import { legalLocales } from '@/locales/legalLocales'
import { supportLocales } from '@/locales/supportLocales'

const SupportPage = () => {
    const t = useTranslations()

    return (
        <div className={'flex flex-1 flex-col overflow-y-auto bg-surface-page'}>
            <div className={'px-4 pt-6 md:px-8'}>
                <PageHeader
                    title={t(supportLocales.header.title)}
                    subtitle={t(supportLocales.header.subtitle)}
                    kicker={t(supportLocales.header.kicker)}
                    backLabel={t(legalLocales.common.backLabel)}
                />
            </div>

            <div className={'mx-auto w-full max-w-[1100px] p-8'}>
                {FEATURES.supportSearch && <SupportSearch/>}
                {FEATURES.supportQuickHelp && <QuickHelpCards/>}
                {FEATURES.supportTopics && <TopicCards/>}
                <SupportFaq/>
                <SupportContact/>
            </div>

            <Footer/>
        </div>
    )
}

export default SupportPage
