'use client'

import { Lock } from 'lucide-react'

import type { ProfileVisibility } from '@/types/profile'

import { DropdownSelector }
    from '@/components/shared/inputs/DropdownSelector'
import { SettingToggle }
    from '@/components/shared/inputs/SettingToggle'

import {
    DEFAULT_VISIBILITY,
    settingsPageTexts,
    visibilityMap
} from '@/constants/componentTexts/settings'

import { useSettings } from '@/context/SettingsContext'

export const PrivacySettings = () => {
    const { settings, onSettingChange } = useSettings()
    const currentVisibility: ProfileVisibility =
        settings?.profileVisibility || DEFAULT_VISIBILITY

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Lock className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {settingsPageTexts.privacy.title}
                </h3>
            </div>

            <div className={'grid grid-cols-1 md:grid-cols-2 gap-6'}>
                <DropdownSelector
                    value={currentVisibility}
                    options={visibilityMap}
                    onChangeAction={(value) =>
                        onSettingChange(
                            'profileVisibility',
                            value
                        )
                    }
                    label={settingsPageTexts
                        .privacy.visibility.title}
                    description={settingsPageTexts
                        .privacy.visibility.description}
                />

                <div className={'p-4 rounded-xl bg-surface-section'}>
                    <h4 className={'font-medium text-foreground mb-1'}>
                        {settingsPageTexts
                            .privacy.dataSharing.title}
                    </h4>
                    <p className={'text-sm text-muted-foreground mb-3'}>
                        {settingsPageTexts
                            .privacy.dataSharing.description}
                    </p>
                    <SettingToggle
                        label={settingsPageTexts
                            .privacy.anonymousParticipation.label
                        }
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
