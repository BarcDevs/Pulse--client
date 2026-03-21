'use client'

import { useState } from 'react'

import { Lock } from 'lucide-react'

import { SettingToggle } from '@/components/shared/SettingToggle'

import {
    SETTINGS_PRIVACY_ANONYMOUS_PARTICIPATION_LABEL,
    SETTINGS_PRIVACY_DATA_SHARING_DESCRIPTION,
    SETTINGS_PRIVACY_DATA_SHARING_TITLE,
    SETTINGS_PRIVACY_TITLE,
    SETTINGS_PRIVACY_VISIBILITY_DESCRIPTION,
    SETTINGS_PRIVACY_VISIBILITY_OPTIONS,
    SETTINGS_PRIVACY_VISIBILITY_TITLE,
} from '@/constants/settingsTexts'

export const PrivacySettings = () => {
    const [profileVisibility, setProfileVisibility] = useState('onlyMe')
    const [anonymousParticipation, setAnonymousParticipation] = useState(true)

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Lock className={'h-5 w-5 text-primary'} />
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {SETTINGS_PRIVACY_TITLE}
                </h3>
            </div>

            <div className={'grid grid-cols-1 md:grid-cols-2 gap-6'}>
                <div className={'p-4 rounded-xl bg-surface-section'}>
                    <h4 className={'font-medium text-foreground mb-1'}>
                        {SETTINGS_PRIVACY_VISIBILITY_TITLE}
                    </h4>
                    <p className={'text-sm text-muted-foreground mb-3'}>
                        {SETTINGS_PRIVACY_VISIBILITY_DESCRIPTION}
                    </p>
                    <select
                        value={profileVisibility}
                        onChange={(e) => setProfileVisibility(e.target.value)}
                        className={
                            'w-full px-3 py-2 rounded-lg bg-surface-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20'
                        }
                    >
                        {SETTINGS_PRIVACY_VISIBILITY_OPTIONS.map(
                            (option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className={'p-4 rounded-xl bg-surface-section'}>
                    <h4 className={'font-medium text-foreground mb-1'}>
                        {SETTINGS_PRIVACY_DATA_SHARING_TITLE}
                    </h4>
                    <p className={'text-sm text-muted-foreground mb-3'}>
                        {SETTINGS_PRIVACY_DATA_SHARING_DESCRIPTION}
                    </p>
                    <SettingToggle
                        label={SETTINGS_PRIVACY_ANONYMOUS_PARTICIPATION_LABEL}
                        checked={anonymousParticipation}
                        onChange={setAnonymousParticipation}
                    />
                </div>
            </div>
        </div>
    )
}
