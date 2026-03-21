'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  CalendarCheck,
  LayoutDashboard,
  Lightbulb,
  MessageSquare,
  Settings,
  TrendingUp,
  User,
  Users,
} from 'lucide-react'

import {Logo} from '@/components/shared/Logo'

import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Daily Check-In', href: '/daily-checkin', icon: CalendarCheck },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
  { name: 'Insights', href: '/insights', icon: Lightbulb },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'AI Chat', href: '/chat', icon: MessageSquare },
]

const bottomNavigation = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-surface-card flex flex-col">
      <div className="pt-3 pl-5">
      <Logo/>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-surface-section hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-border px-3 py-4 space-y-1">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-surface-section hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </div>

      {/* User Profile */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-surface-section flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface-card bg-success" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Alex Rivera</p>
            <p className="text-xs text-muted-foreground">Day 142 In Recovery</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
