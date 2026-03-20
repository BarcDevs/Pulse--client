import { Quote } from 'lucide-react'

export function CheckInQuote() {
  return (
    <div className="mt-10 rounded-2xl bg-[var(--primary-light)] p-8 text-center">
      <Quote className="mx-auto mb-4 size-8 text-[var(--primary)]" />
      <blockquote className="text-lg italic text-[var(--foreground)]">
        {'"Recovery is not a race. It\'s a journey of small, daily wins that build a lifetime of strength. You\'re doing better than you think."'}
      </blockquote>
    </div>
  )
}
