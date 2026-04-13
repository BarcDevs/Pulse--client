'use client'

import { Bell } from 'lucide-react'

import { SettingToggle } from '@/components/shared/inputs/SettingToggle'

import { settingsPageTexts } from '@/constants/componentTexts/settings'

import { useSettings } from '@/context/SettingsContext'

export const NotificationsSettings = () => {
    const { settings, onSettingChange } = useSettings()

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Bell className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {settingsPageTexts.notifications.title}
                </h3>
            </div>

            <div className={'space-y-6'}>
                <SettingToggle
                    label={
                        settingsPageTexts
                            .notifications.dailyReminder.label
                    }
                    description={
                        settingsPageTexts
                            .notifications.dailyReminder.description
                    }
                    checked={settings?.dailyReminder || false}
                    onChangeAction={(value) =>
                        onSettingChange('dailyReminder', value)
                    }
                />

                <SettingToggle
                    label={
                        settingsPageTexts
                            .notifications.communityAlerts.label
                    }
                    description={
                        settingsPageTexts
                            .notifications.communityAlerts.description
                    }
                    checked={settings?.communityAlerts || false}
                    onChangeAction={(value) =>
                        onSettingChange('communityAlerts', value)
                    }
                />
            </div>
        </div>
    )
}
