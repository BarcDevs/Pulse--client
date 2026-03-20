import { ArrowRight, ClipboardCheck } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export function DashboardCheckInCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] p-6 text-white">
      <div className="relative z-10">
        <Badge className="mb-4 border-0 bg-white/20 text-white hover:bg-white/30">
          ACTION REQUIRED
        </Badge>
        <h2 className="mb-2 text-2xl font-semibold">
          Ready for your Daily Check-In?
        </h2>
        <p className="mb-6 max-w-md text-white/90">
          Maintaining consistent tracking is the key to identifying patterns in your recovery journey.
        </p>
        <Button
          asChild
          variant="outline"
          className="border-white/30 bg-white text-[var(--primary)] hover:bg-white/90 hover:text-[var(--primary)]"
        >
          <Link href="/check-in">
            Start Check-In
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>

      {/* Decorative Icon */}
      <div className="absolute -right-4 -bottom-4 opacity-20">
        <ClipboardCheck className="size-48" />
      </div>
    </div>
  )
}
