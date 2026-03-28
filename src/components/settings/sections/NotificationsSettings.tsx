'use client'

import {Bell} from 'lucide-react'

import {SettingToggle} from '@/components/shared/inputs/SettingToggle'

import {useNotificationsSettingsForm} from '@/hooks/forms/useNotificationsSettingsForm'

import {settingsPageTexts} from '@/constants/componentTexts/settings'

export const NotificationsSettings = () => {
    const { form } = useNotificationsSettingsForm()

    const dailyReminder = form.watch('dailyReminder')
    const communityAlerts = form.watch('communityAlerts')

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
                    checked={dailyReminder}
                    onChange={
                        (value) => form.setValue(
                            'dailyReminder',
                            value
                        )
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
                    checked={communityAlerts}
                    onChange={
                        (value) => form.setValue(
                            'communityAlerts',
                            value
                        )
                    }
                />
            </div>
        </div>
    )
}
