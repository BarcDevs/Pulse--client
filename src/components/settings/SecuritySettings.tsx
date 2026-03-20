'use client'

import { AlertTriangle, Edit2,Lock, Mail, Shield } from 'lucide-react'

export function SecuritySettings() {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Account & Security</h3>
      </div>

      <div className="space-y-4">
        {/* Email Address */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface-section)]">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <h4 className="font-medium text-foreground">Email Address</h4>
              <p className="text-sm text-muted-foreground">alex@example.com</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-[var(--surface-card)] transition-colors">
            <Edit2 className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Password */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface-section)]">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <div>
              <h4 className="font-medium text-foreground">Password</h4>
              <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-[var(--surface-card)] transition-colors">
            <Edit2 className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Deactivate Account */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <h4 className="font-medium text-destructive">Deactivate Account</h4>
              <p className="text-sm text-muted-foreground">Permanently remove your recovery data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
