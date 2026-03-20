'use client'

import { Sidebar } from './Sidebar'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--surface-page)]">
      <Sidebar />
      <main className="pl-64">
        {children}
      </main>
    </div>
  )
}
