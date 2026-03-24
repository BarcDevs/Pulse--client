'use client'

import {useState} from 'react'

import {
    Bell,
    HelpCircle,
    Lock,
    Palette,
    Shield
} from 'lucide-react'

import {Button} from '@/components/ui/button'

import {cn} from '@/lib/utils'

import * as SettingsTexts from '@/constants/settingsTexts'

import {AppPreferences} from './AppPreferences'
import {NotificationsSettings} from './NotificationsSettings'
import {PrivacySettings} from './PrivacySettings'
import {SecuritySettings} from './SecuritySettings'

const iconMap = {
    Bell,
    Lock,
    Shield,
    Palette
}

export const SettingsContent = () => {
    const [activeTab, setActiveTab] = useState('notifications')

    return (
        <div className={'p-6'}>
            <div className={'grid grid-cols-1 lg:grid-cols-4 gap-6'}>
                {/* Sidebar Navigation */}
                <div className={'space-y-2'}>
                    {SettingsTexts.SETTINGS_TABS.map((tab) => {
                        const IconComponent = iconMap[tab.icon as keyof typeof iconMap]
                        return (
                            <Button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                variant={
                                    activeTab === tab.id
                                        ? 'default'
                                        : 'ghost'
                                }
                                className={cn(
                                    'w-full justify-start gap-3 px-4 py-3 rounded-xl',
                                    activeTab === tab.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-surface-section hover:text-foreground'
                                )}
                            >
                                <IconComponent className={'h-5 w-5'}/>
                                {tab.label}
                            </Button>
                        )
                    })}

                    {/* Help Center Link */}
                    <div className={'pt-4 mt-4 border-t border-border'}>
            <span className={'text-xs font-medium text-muted-foreground uppercase tracking-wider px-4'}>
              {SettingsTexts.SETTINGS_SUPPORT_LABEL}
            </span>
                        <Button
                            variant={'ghost'}
                            className={'w-full justify-start gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-surface-section hover:text-foreground mt-2'}
                        >
                            <HelpCircle className={'h-5 w-5'}/>
                            {SettingsTexts.SETTINGS_HELP_CENTER}
                        </Button>
                    </div>
                </div>

                {/* Content Area */}
                <div className={'lg:col-span-3 space-y-6'}>
                    {activeTab === 'notifications' && <NotificationsSettings/>}
                    {activeTab === 'privacy' && <PrivacySettings/>}
                    {activeTab === 'security' && <SecuritySettings/>}
                    {activeTab === 'preferences' && <AppPreferences/>}

                    {/* Save Button */}
                    <div className={'flex items-center justify-end gap-3 pt-4 border-t border-border'}>
                        <Button variant={'outline'}>
                            {SettingsTexts.SETTINGS_DISCARD_CHANGES}
                        </Button>
                        <Button className={'bg-primary hover:bg-primary/90 text-primary-foreground'}>
                            {SettingsTexts.SETTINGS_SAVE_PREFERENCES}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
