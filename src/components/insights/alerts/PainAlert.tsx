import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { insightsPageTexts }
    from '@/constants/componentTexts/insightsComponent'

export const PainAlert = () => (
    <div className={'rounded-2xl bg-destructive/5 border border-destructive/20 p-6'}>
        <div className={'flex items-start gap-3'}>
            <div className={'p-2 rounded-lg bg-destructive/10'}>
                <AlertTriangle className={'h-5 w-5 text-destructive'}/>
            </div>
            <div className={'flex-1'}>
                <h3 className={'font-semibold text-foreground'}>
                    {insightsPageTexts.painAlert.title}
                </h3>
                <p className={'mt-1 text-sm text-muted-foreground leading-relaxed'}>
                    {insightsPageTexts.painAlert.description}
                </p>
                <div className={'mt-4 flex items-center gap-2'}>
                    <span className={'text-xs font-medium text-destructive'}>
                        {insightsPageTexts.painAlert.status}
                    </span>
                    <Button
                        variant={'link'}
                        className={'h-auto p-0 text-xs text-primary hover:underline'}
                    >
                        {insightsPageTexts.painAlert.action}
                    </Button>
                </div>
            </div>
        </div>
    </div>
)