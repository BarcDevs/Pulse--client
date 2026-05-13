'use client'

import { useTranslations } from 'next-intl'

import { Mail } from 'lucide-react'
import { toast } from 'sonner'

import { useAuth } from '@/context/AuthContext'

import { settingsLocales } from '@/locales/settingsLocales'

import { SecuritySettingItem } from '../items/SecuritySettingItem'

// TODO: implement email change OTP verification flow
export const EmailSection = () => {
    const t = useTranslations()
    const { user } = useAuth()

    return (
        <SecuritySettingItem
            icon={<Mail className={'h-5 w-5 text-muted-foreground'}/>}
            label={t(settingsLocales.security.email)}
            value={user?.email || ''}
            onClickAction={() =>
                toast.info(t(settingsLocales.security.emailComingSoon))
            }
        />
    )
}
