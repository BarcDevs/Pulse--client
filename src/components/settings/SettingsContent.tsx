'use client'

import { useState } from 'react'

import { Bell, HelpCircle,Lock, Palette, Shield } from 'lucide-react'

import { Button } from '@/components/ui/Button'

import { cn } from '@/lib/utils'

import { AppPreferences } from './AppPreferences'
import { NotificationsSettings } from './NotificationsSettings'
import { PrivacySettings } from './PrivacySettings'
import { SecuritySettings } from './SecuritySettings'

const tabs = [
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Lock },
  { id: 'security', label: 'Account & Security', icon: Shield },
  { id: 'preferences', label: 'App Preferences', icon: Palette },
]

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState('notifications')

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-[var(--surface-section)] hover:text-foreground'
              )}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}

          {/* Help Center Link */}
          <div className="pt-4 mt-4 border-t border-border">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4">
              Support
            </span>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-[var(--surface-section)] hover:text-foreground transition-colors text-left mt-2">
              <HelpCircle className="h-5 w-5" />
              Help Center
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'notifications' && <NotificationsSettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'preferences' && <AppPreferences />}

          {/* Save Button */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline">Discard Changes</Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
