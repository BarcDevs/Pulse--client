'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { isAxiosError } from 'axios'

import { useSendSupportMessage } from '@/hooks/mutations/useSendSupportMessage'

import { isNetworkError } from '@/utils/error'

import { SUPPORT_CONTACT_ANCHOR } from '@/constants/support'

import { useAuth } from '@/context/AuthContext'

import { supportLocales } from '@/locales/supportLocales'
import { SupportSchema } from '@/validations/forms/supportSchema'

import { SupportContactForm } from './SupportContactForm'
import { SupportContactInfo } from './SupportContactInfo'
import { SupportContactSent } from './SupportContactSent'

export const SupportContact = () => {
    const t = useTranslations()
    const {
        user,
        setNetworkError
    } = useAuth()
    const [sent, setSent] = useState(false)
    const { mutateAsync } = useSendSupportMessage()

    const handleSubmit = async (data: SupportSchema) => {
        try {
            await mutateAsync(data)
        } catch (error) {
            if (isNetworkError(error as Error)) setNetworkError(error as Error)
            throw new Error(t(
                isAxiosError(error) && error.response?.status === 429
                    ? supportLocales.contact.errors.rateLimited
                    : supportLocales.contact.errors.generic
            ))
        }
        setSent(true)
    }

    return (
        <div
            id={SUPPORT_CONTACT_ANCHOR}
            className={'mb-10 scroll-mt-8 rounded-2xl border border-border bg-card p-8'}
        >
            <div className={'grid grid-cols-1 items-start gap-5 md:grid-cols-[1fr_1.4fr] md:gap-8'}>
                <div>
                    <h3 className={'mb-2 text-xl font-bold text-on-surface'}>
                        {t(supportLocales.contact.title)}
                    </h3>
                    <p className={'mb-[18px] text-sm leading-[1.7] text-muted-foreground'}>
                        {t(supportLocales.contact.description)}
                    </p>
                    <SupportContactInfo/>
                </div>
                {sent ? (
                    <SupportContactSent onSendAnother={() => setSent(false)}/>
                ) : (
                    <SupportContactForm
                        requireEmail={!user}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    )
}
