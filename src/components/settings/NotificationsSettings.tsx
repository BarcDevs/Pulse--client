'use client'

import {Bell} from 'lucide-react'

import {SettingToggle} from '@/components/shared/SettingToggle'

import {useNotificationsSettingsForm} from '@/hooks/useNotificationsSettingsForm'

import * as SettingsTexts from '@/constants/settingsTexts'

export const NotificationsSettings = () => {
    const {form} = useNotificationsSettingsForm()

    const dailyReminder = form.watch('dailyReminder')
    const communityAlerts = form.watch('communityAlerts')

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Bell className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {SettingsTexts.SETTINGS_NOTIFICATIONS_TITLE}
                </h3>
            </div>

            <div className={'space-y-6'}>
                <SettingToggle
                    label={
                        SettingsTexts
                            .SETTINGS_NOTIFICATIONS_DAILY_REMINDER_LABEL
                    }
                    description={
                        SettingsTexts
                            .SETTINGS_NOTIFICATIONS_DAILY_REMINDER_DESCRIPTION
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
                        SettingsTexts
                            .SETTINGS_NOTIFICATIONS_COMMUNITY_ALERTS_LABEL
                    }
                    description={
                        SettingsTexts
                            .SETTINGS_NOTIFICATIONS_COMMUNITY_ALERTS_DESCRIPTION
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
