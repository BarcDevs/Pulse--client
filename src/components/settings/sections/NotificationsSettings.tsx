'use client'

import { useTranslations } from 'next-intl'

import { Bell } from 'lucide-react'

import { SettingToggle } from '@/components/shared/inputs/SettingToggle'

import { useSettings } from '@/context/SettingsContext'

import { settingsLocales } from '@/locales/settingsLocales'

export const NotificationsSettings = () => {
    const t = useTranslations()
    const { settings, onSettingChange } = useSettings()

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Bell className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {t(settingsLocales.notifications.title)}
                </h3>
            </div>

            <div className={'space-y-6'}>
                <SettingToggle
                    label={t(settingsLocales.notifications.dailyReminder.label)}
                    description={t(settingsLocales.notifications.dailyReminder.description)}
                    checked={settings?.dailyReminder || false}
                    onChangeAction={(value) =>
                        onSettingChange('dailyReminder', value)
                    }
                />

                <SettingToggle
                    label={t(settingsLocales.notifications.communityAlerts.label)}
                    description={t(settingsLocales.notifications.communityAlerts.description)}
                    checked={settings?.communityAlerts || false}
                    onChangeAction={(value) =>
                        onSettingChange('communityAlerts', value)
                    }
                />
            </div>
        </div>
    )
}
