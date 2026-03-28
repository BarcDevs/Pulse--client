'use client'

import {Lock} from 'lucide-react'

import {SettingToggle} from '@/components/shared/inputs/SettingToggle'

import {usePrivacySettingsForm}
    from '@/hooks/forms/usePrivacySettingsForm'

import {settingsPageTexts}
    from '@/constants/componentTexts/settings'

export const PrivacySettings = () => {
    const { form } = usePrivacySettingsForm()

    const profileVisibility = form
        .watch('profileVisibility')
    const anonymousParticipation = form
        .watch('anonymousParticipation')

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Lock className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {settingsPageTexts.privacy.title}
                </h3>
            </div>

            <div className={'grid grid-cols-1 md:grid-cols-2 gap-6'}>
                <div className={'p-4 rounded-xl bg-surface-section'}>
                    <h4 className={'font-medium text-foreground mb-1'}>
                        {settingsPageTexts
                            .privacy.visibility.title}
                    </h4>
                    <p className={'text-sm text-muted-foreground mb-3'}>
                        {settingsPageTexts
                            .privacy.visibility.description}
                    </p>
                    <select
                        value={profileVisibility}
                        onChange={
                            (e) => form.setValue(
                                'profileVisibility',
                                e.target.value as
                                    'onlyMe' |
                                    'friends' |
                                    'public'
                            )}
                        className={'w-full px-3 py-2 rounded-lg bg-surface-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20'}
                    >
                        {settingsPageTexts
                            .privacy.visibility.options
                            .map((option) => (
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
                        checked={anonymousParticipation}
                        onChange={
                            (value) => form.setValue(
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
