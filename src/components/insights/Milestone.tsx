import { Trophy } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

import {
    INSIGHTS_MILESTONE_DESCRIPTION,
    INSIGHTS_MILESTONE_LEVEL,
    INSIGHTS_MILESTONE_TITLE,
} from '@/constants/insightsDetailTexts'

export const InsightsMilestone = () => {
  return (
    <Card className={'border-0 bg-accent text-white shadow-sm'}>
      <CardContent className={'pt-6'}>
        <div className={'flex items-start gap-3'}>
          <Trophy className={'size-8'} />
          <div>
            <h3 className={'text-xl font-semibold'}>
              {INSIGHTS_MILESTONE_TITLE}
            </h3>
            <p className={'mt-2 text-white/90'}>
              {INSIGHTS_MILESTONE_DESCRIPTION}
            </p>
            <p className={'mt-4 text-xs font-medium uppercase tracking-wider text-white/60'}>
              {INSIGHTS_MILESTONE_LEVEL}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
