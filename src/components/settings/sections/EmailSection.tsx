'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Mail } from 'lucide-react'

import { useAuth } from '@/context/AuthContext'

import { settingsLocales } from '@/locales/settingsLocales'

import { SecuritySettingItem } from '../items/SecuritySettingItem'
import { EmailChangeStep } from '../steps/EmailChangeStep'
import { OtpConfirmStep } from '../steps/OtpConfirmStep'

export const EmailSection = () => {
    const t = useTranslations()
    const { user } = useAuth()
    const [expanded, setExpanded] = useState(false)
    const [step, setStep] = useState<'email' | 'otp'>('email')

    const handleClose = () => {
        setExpanded(false)
        setStep('email')
    }

    return (
        <div className={expanded ? 'rounded-xl bg-surface-section' : ''}>
            <SecuritySettingItem
                icon={<Mail className={'h-5 w-5 text-muted-foreground'}/>}
                label={t(settingsLocales.security.email.label)}
                value={user?.email || ''}
                flat={expanded}
                onClickAction={() => setExpanded((prev) => !prev)}
            />
            {expanded && step === 'email' && (
                <EmailChangeStep
                    onSuccessAction={() => setStep('otp')}
                    onCancelAction={handleClose}
                />
            )}
            {expanded && step === 'otp' && (
                <OtpConfirmStep
                    onSuccessAction={handleClose}
                    onCancelAction={handleClose}
                />
            )}
        </div>
    )
}
