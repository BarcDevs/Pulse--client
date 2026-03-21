'use client'

import { AlertTriangle, Lightbulb } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
    INSIGHTS_ACTIONABLE_STEP_BUTTON,
    INSIGHTS_ACTIONABLE_STEP_DESCRIPTION,
    INSIGHTS_ACTIONABLE_STEP_TITLE,
    INSIGHTS_PAIN_ALERT_ACTION,
    INSIGHTS_PAIN_ALERT_DESCRIPTION,
    INSIGHTS_PAIN_ALERT_STATUS,
    INSIGHTS_PAIN_ALERT_TITLE,
} from '@/constants/insightsComponentTexts'

export const AlertCards = () => (
  <div className={'grid grid-cols-1 md:grid-cols-2 gap-6'}>
    {/* Pain Trend Alert */}
    <div className={'rounded-2xl bg-destructive/5 border border-destructive/20 p-6'}>
      <div className={'flex items-start gap-3'}>
        <div className={'p-2 rounded-lg bg-destructive/10'}>
          <AlertTriangle className={'h-5 w-5 text-destructive'} />
        </div>
        <div className={'flex-1'}>
          <h3 className={'font-semibold text-foreground'}>{INSIGHTS_PAIN_ALERT_TITLE}</h3>
          <p className={'mt-1 text-sm text-muted-foreground leading-relaxed'}>
            {INSIGHTS_PAIN_ALERT_DESCRIPTION}
          </p>
          <div className={'mt-4 flex items-center gap-2'}>
            <span className={'text-xs font-medium text-destructive'}>{INSIGHTS_PAIN_ALERT_STATUS}</span>
            <button className={'text-xs text-primary hover:underline'}>
              {INSIGHTS_PAIN_ALERT_ACTION}
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Actionable Step */}
    <div className={'rounded-2xl bg-secondary/5 border border-secondary/20 p-6'}>
      <div className={'flex items-start gap-3'}>
        <div className={'p-2 rounded-lg bg-secondary/10'}>
          <Lightbulb className={'h-5 w-5 text-secondary'} />
        </div>
        <div className={'flex-1'}>
          <h3 className={'font-semibold text-foreground'}>{INSIGHTS_ACTIONABLE_STEP_TITLE}</h3>
          <p className={'mt-1 text-sm text-muted-foreground leading-relaxed'}>
            {INSIGHTS_ACTIONABLE_STEP_DESCRIPTION}
          </p>
          <div className={'mt-4'}>
            <Button size={'sm'} className={'bg-secondary hover:bg-secondary/90 text-secondary-foreground'}>
              {INSIGHTS_ACTIONABLE_STEP_BUTTON}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
)
