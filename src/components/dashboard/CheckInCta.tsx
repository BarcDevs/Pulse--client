'use client'

import { ArrowRight, ClipboardCheck } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'

export function CheckInCTA() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] p-6 text-primary-foreground">
      {/* Decorative checkmark */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
        <ClipboardCheck className="h-32 w-32" />
      </div>
      
      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" />
          Action Required
        </span>
        
        <h2 className="mt-4 text-2xl font-semibold">
          Ready for your Daily Check-In?
        </h2>
        
        <p className="mt-2 max-w-md text-primary-foreground/80">
          Maintaining consistent tracking is the key to identifying patterns in your recovery journey.
        </p>
        
        <Link href="/daily-checkin">
          <Button 
            variant="secondary" 
            className="mt-6 bg-white text-primary hover:bg-white/90"
          >
            Start Check-In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
