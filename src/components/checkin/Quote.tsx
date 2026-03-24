import { Quote } from 'lucide-react'

import { CHECKIN_QUOTE } from '@/constants/checkInTexts'

export const CheckInQuote = () => (
  <div className={'mt-10 rounded-2xl bg-primary-light p-8 text-center'}>
    <Quote className={'mx-auto mb-4 size-8 text-primary'} />
    <blockquote className={'text-lg italic text-foreground'}>
      {CHECKIN_QUOTE}
    </blockquote>
  </div>
)
