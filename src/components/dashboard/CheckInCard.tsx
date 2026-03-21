import Link from 'next/link'

import { ArrowRight, ClipboardCheck } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
    DASHBOARD_CHECKIN_BADGE,
    DASHBOARD_CHECKIN_BUTTON,
    DASHBOARD_CHECKIN_DESCRIPTION,
    DASHBOARD_CHECKIN_TITLE,
} from '@/constants/dashboardTexts'

export const DashboardCheckInCard = () => (
  <div className={'relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-gradient-start to-primary-gradient-end p-6 text-white'}>
    <div className={'relative z-10'}>
      <Badge className={'mb-4 border-0 bg-white/20 text-white hover:bg-white/30'}>
        {DASHBOARD_CHECKIN_BADGE}
      </Badge>
      <h2 className={'mb-2 text-2xl font-semibold'}>
        {DASHBOARD_CHECKIN_TITLE}
      </h2>
      <p className={'mb-6 max-w-md text-white/90'}>
        {DASHBOARD_CHECKIN_DESCRIPTION}
      </p>
      <Button
        asChild
        variant={'outline'}
        className={'border-white/30 bg-white text-primary hover:bg-white/90 hover:text-primary'}
      >
        <Link href={'/check-in'}>
          {DASHBOARD_CHECKIN_BUTTON}
          <ArrowRight className={'ml-2 size-4'} />
        </Link>
      </Button>
    </div>

    {/* Decorative Icon */}
    <div className={'absolute -right-4 -bottom-4 opacity-20'}>
      <ClipboardCheck className={'size-48'} />
    </div>
  </div>
)
