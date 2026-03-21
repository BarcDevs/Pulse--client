'use client'

import { useState } from 'react'

import { Bell } from 'lucide-react'

import { SettingToggle } from '@/components/shared/SettingToggle'

import {
    SETTINGS_NOTIFICATIONS_COMMUNITY_ALERTS_DESCRIPTION,
    SETTINGS_NOTIFICATIONS_COMMUNITY_ALERTS_LABEL,
    SETTINGS_NOTIFICATIONS_DAILY_REMINDER_DESCRIPTION,
    SETTINGS_NOTIFICATIONS_DAILY_REMINDER_LABEL,
    SETTINGS_NOTIFICATIONS_TITLE,
} from '@/constants/settingsTexts'

export const NotificationsSettings = () => {
    const [dailyReminder, setDailyReminder] = useState(true)
    const [communityAlerts, setCommunityAlerts] = useState(false)

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Bell className={'h-5 w-5 text-primary'} />
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {SETTINGS_NOTIFICATIONS_TITLE}
                </h3>
            </div>

            <div className={'space-y-6'}>
                <SettingToggle
                    label={SETTINGS_NOTIFICATIONS_DAILY_REMINDER_LABEL}
                    description={
                        SETTINGS_NOTIFICATIONS_DAILY_REMINDER_DESCRIPTION
                    }
                    checked={dailyReminder}
                    onChange={setDailyReminder}
                />

                <SettingToggle
                    label={SETTINGS_NOTIFICATIONS_COMMUNITY_ALERTS_LABEL}
                    description={
                        SETTINGS_NOTIFICATIONS_COMMUNITY_ALERTS_DESCRIPTION
                    }
                    checked={communityAlerts}
                    onChange={setCommunityAlerts}
                />
            </div>
        </div>
    )
}
