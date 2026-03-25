import { AlertTriangle, BarChart3 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import * as InsightsComponentTexts from '@/constants/insightsComponentTexts'

export const CriticalInsight = () => (
  <div className={'rounded-2xl bg-surface-card p-6'}>
    <div className={'flex items-center gap-2 mb-4'}>
      <span className={'inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive'}>
        <AlertTriangle className={'h-3 w-3'} />
        {InsightsComponentTexts.INSIGHTS_CRITICAL_INSIGHT_LABEL}
      </span>
    </div>

    <h2 className={'text-2xl font-bold text-foreground leading-tight'}>
      {InsightsComponentTexts.INSIGHTS_CRITICAL_INSIGHT_TITLE}
    </h2>

    <p className={'mt-3 text-muted-foreground leading-relaxed'}>
      {InsightsComponentTexts.INSIGHTS_CRITICAL_INSIGHT_DESCRIPTION}
    </p>

    <div className={'mt-6 flex items-center gap-3'}>
      <Button className={'bg-primary hover:bg-primary/90 text-primary-foreground'}>
        {InsightsComponentTexts.INSIGHTS_CRITICAL_INSIGHT_BUTTON_PRIMARY}
      </Button>
      <Button variant={'ghost'} className={'text-muted-foreground'}>
        <BarChart3 className={'mr-2 h-4 w-4'} />
        {InsightsComponentTexts.INSIGHTS_CRITICAL_INSIGHT_BUTTON_SECONDARY}
      </Button>
    </div>
  </div>
)
