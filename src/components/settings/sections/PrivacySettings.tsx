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
            <div className={'flex items-center gap-2 mb-6'}>
                <Lock className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {t(settingsLocales.privacy.title)}
                </h3>
            </div>

            <div className={'grid grid-cols-1 md:grid-cols-2 gap-6'}>
                <DropdownSelector
                    value={currentVisibility}
                    options={Object.fromEntries(
                        VISIBILITY_OPTIONS.map(opt => [opt.value, opt.label])
                    )}
                    onChangeAction={(value) =>
                        onSettingChange(
                            'profileVisibility',
                            value
                        )
                    }
                    label={t(settingsLocales.privacy.visibility.title)}
                    description={t(settingsLocales.privacy.visibility.description)}
                />

                <div className={'p-4 rounded-xl bg-surface-section'}>
                    <h4 className={'font-medium text-foreground mb-1'}>
                        {t(settingsLocales.privacy.dataSharing.title)}
                    </h4>
                    <p className={'text-sm text-muted-foreground mb-3'}>
                        {t(settingsLocales.privacy.dataSharing.description)}
                    </p>
                    <SettingToggle
                        label={t(settingsLocales.privacy.anonymousParticipation.label)}
                        checked={settings?.anonymousParticipation
                            || false
                        }
                        onChangeAction={(value) =>
                            onSettingChange(
                                'anonymousParticipation',
                                value
                            )
                        }
                    />
                </div>
            </div>
        </div>
    )
}
