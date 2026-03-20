'use client'

import { useState } from 'react'

import { Moon,Palette, Sun } from 'lucide-react'

import { cn } from '@/lib/utils'

export function AppPreferences() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [language, setLanguage] = useState('en-US')

  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <div className="flex items-center gap-2 mb-6">
        <Palette className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">App Preferences</h3>
      </div>

      <div className="space-y-6">
        {/* Theme Mode */}
        <div>
          <h4 className="font-medium text-foreground mb-1">Theme Mode</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Select your visual preference
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('light')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
                theme === 'light'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground'
              )}
            >
              <Sun className="h-4 w-4" />
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
                theme === 'dark'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground'
              )}
            >
              <Moon className="h-4 w-4" />
              Dark
            </button>
          </div>
        </div>

        {/* Language */}
        <div>
          <h4 className="font-medium text-foreground mb-1">Preferred Language</h4>
          <p className="text-sm text-muted-foreground mb-3">
            The language used across the app interface
          </p>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full max-w-xs px-3 py-2 rounded-lg bg-[var(--surface-section)] border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="en-US">English (US)</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>
    </div>
  )
}
