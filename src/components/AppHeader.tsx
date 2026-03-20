'use client'

import { Bell } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SidebarTrigger } from '@/components/ui/Sidebar'

interface AppHeaderProps {
  title: string
  subtitle?: string
}

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--surface-card)] px-4 md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h1 className="text-lg font-semibold text-[var(--foreground)]">{title}</h1>
          {subtitle && (
            <p className="text-sm text-[var(--muted-foreground)]">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5 text-[var(--muted-foreground)]" />
          <Badge className="absolute -right-1 -top-1 size-5 rounded-full p-0 text-[10px]">
            3
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>
        <Avatar className="size-9">
          <AvatarImage src="/avatars/alex.jpg" alt="Alex Rivera" />
          <AvatarFallback className="bg-[var(--primary-light)] text-[var(--primary)]">
            AR
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
