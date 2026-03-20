'use client'

import { useState } from 'react'

import { Lock } from 'lucide-react'

export function PrivacySettings() {
  const [profileVisibility, setProfileVisibility] = useState('onlyMe')
  const [anonymousParticipation, setAnonymousParticipation] = useState(true)

  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Privacy Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Visibility */}
        <div className="p-4 rounded-xl bg-[var(--surface-section)]">
          <h4 className="font-medium text-foreground mb-1">Profile Visibility</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Choose who can see your progress and badges
          </p>
          <select
            value={profileVisibility}
            onChange={(e) => setProfileVisibility(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[var(--surface-card)] border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="onlyMe">Only Me</option>
            <option value="mentors">Mentors Only</option>
            <option value="community">Community</option>
          </select>
        </div>

        {/* Data Sharing */}
        <div className="p-4 rounded-xl bg-[var(--surface-section)]">
          <h4 className="font-medium text-foreground mb-1">Data Sharing</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Allow HealEase to use anonymized data for research
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Anonymous Participation</span>
            <button
              onClick={() => setAnonymousParticipation(!anonymousParticipation)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                anonymousParticipation ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                  anonymousParticipation ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
