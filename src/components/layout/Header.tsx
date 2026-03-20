'use client'

import { Bell, Search } from 'lucide-react'

import { Button } from '@/components/ui/Button'

interface HeaderProps {
  title: string
  subtitle?: string
  showSearch?: boolean
  actions?: React.ReactNode
}

export function Header({ title, subtitle, showSearch = false, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-[var(--surface-page)] px-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-64 rounded-lg bg-[var(--surface-card)] pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        )}
        
        {actions}

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
          AR
        </div>
      </div>
    </header>
  )
}
