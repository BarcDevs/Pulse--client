import { Sparkles, X } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export function ProgressInsight() {
  return (
    <div className="mt-6 relative overflow-hidden rounded-2xl bg-[var(--primary)] p-6 text-white">
      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5" />
          <span className="text-sm font-medium uppercase tracking-wider opacity-80">
            AI RECOVERY INSIGHT
          </span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-balance">
          Your pain levels are dropping concurrently with improved sleep consistency.
        </h3>
        <p className="mt-3 max-w-2xl text-white/80">
          Data suggests that the 15-minute meditation you started 4 days ago is having a 12% positive impact on your morning mood scores. Keep this routine!
        </p>
        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            Keep Going
          </Button>
          <Button className="bg-white text-[var(--primary)] hover:bg-white/90">
            Acknowledge
          </Button>
        </div>
      </div>

      {/* Close button */}
      <button className="absolute right-4 top-4 rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white">
        <X className="size-5" />
      </button>

      {/* Decorative element */}
      <div className="absolute -right-10 -bottom-10 opacity-10">
        <svg className="size-64" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
