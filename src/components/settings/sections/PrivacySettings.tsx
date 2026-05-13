'use client'

import { useTranslations } from 'next-intl'

import { Lock } from 'lucide-react'

import type { ProfileVisibility } from '@/types/profile'

import { DropdownSelector }
    from '@/components/shared/inputs/DropdownSelector'
import { SettingToggle }
    from '@/components/shared/inputs/SettingToggle'

import {
    DEFAULT_VISIBILITY,
    VISIBILITY_OPTIONS
} from '@/config/settingsOptions'

import { useSettings } from '@/context/SettingsContext'

import { settingsLocales } from '@/locales/settingsLocales'

export const PrivacySettings = () => {
    const t = useTranslations()
    const { settings, onSettingChange } = useSettings()
    const currentVisibility: ProfileVisibility =
        settings?.profileVisibility || DEFAULT_VISIBILITY

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-2'}>
                <Lock className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {t(settingsLocales.privacy.title)}
                </h3>
            </div>
            <p className={'text-sm text-muted-foreground mb-6'}>
                {t(settingsLocales.privacy.description)}
            </p>

            <div className={'space-y-6'}>
                {/* TODO: share anonymized data toggle — no API backing yet */}
                <SettingToggle
                    label={t(settingsLocales.privacy.dataSharing.title)}
                    description={t(settingsLocales.privacy.dataSharing.description)}
                    checked={false}
                    disabled
                    onChangeAction={() => {}}
                />

                <SettingToggle
                    label={t(settingsLocales.privacy.anonymousParticipation.label)}
                    description={t(settingsLocales.privacy.anonymousParticipation.description)}
                    checked={settings?.anonymousParticipation || false}
                    onChangeAction={(value) =>
                        onSettingChange('anonymousParticipation', value)
                    }
                />

                {/* TODO: activity visible to mentors — map to profileVisibility or new field */}
                <SettingToggle
                    label={t(settingsLocales.privacy.activityVisible.label)}
                    description={t(settingsLocales.privacy.activityVisible.description)}
                    checked={false}
                    disabled
                    onChangeAction={() => {}}
                />

                <DropdownSelector
                    value={currentVisibility}
                    options={Object.fromEntries(
                        VISIBILITY_OPTIONS.map((opt) => [opt.value, opt.label])
                    )}
                    onChangeAction={(value) =>
                        onSettingChange('profileVisibility', value)
                    }
                    label={t(settingsLocales.privacy.visibility.title)}
                    description={t(settingsLocales.privacy.visibility.description)}
                />
            </div>
        </div>
    )
}
