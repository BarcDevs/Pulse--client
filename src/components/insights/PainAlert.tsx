import {AlertTriangle} from 'lucide-react'

import {Button} from '@/components/ui/button'

import * as InsightsComponentTexts
    from '@/constants/insightsComponentTexts'

export const PainAlert = () => (
    <div className={'rounded-2xl bg-destructive/5 border border-destructive/20 p-6'}>
        <div className={'flex items-start gap-3'}>
            <div className={'p-2 rounded-lg bg-destructive/10'}>
                <AlertTriangle className={'h-5 w-5 text-destructive'} />
            </div>
            <div className={'flex-1'}>
                <h3 className={'font-semibold text-foreground'}>
                    {InsightsComponentTexts.INSIGHTS_PAIN_ALERT_TITLE}
                </h3>
                <p className={'mt-1 text-sm text-muted-foreground leading-relaxed'}>
                    {InsightsComponentTexts.INSIGHTS_PAIN_ALERT_DESCRIPTION}
                </p>
                <div className={'mt-4 flex items-center gap-2'}>
                    <span className={'text-xs font-medium text-destructive'}>
                        {InsightsComponentTexts.INSIGHTS_PAIN_ALERT_STATUS}
                    </span>
                    <Button
                        variant={'link'}
                        className={'h-auto p-0 text-xs text-primary hover:underline'}
                    >
                        {InsightsComponentTexts.INSIGHTS_PAIN_ALERT_ACTION}
                    </Button>
                </div>
            </div>
        </div>
    </div>
)