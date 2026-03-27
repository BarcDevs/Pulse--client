import {AlertTriangle, BarChart3} from 'lucide-react'

import {Button} from '@/components/ui/button'

import {insightsPageTexts}
    from '@/constants/componentTexts/insightsComponent'

export const CriticalInsight = () => (
    <div className={'rounded-2xl bg-surface-card p-6'}>
        <div className={'flex items-center gap-2 mb-4'}>
      <span className={'inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive'}>
        <AlertTriangle className={'h-3 w-3'}/>
          {insightsPageTexts.criticalInsight.label}
      </span>
        </div>

        <h2 className={'text-2xl font-bold text-foreground leading-tight'}>
            {insightsPageTexts.criticalInsight.title}
        </h2>

        <p className={'mt-3 text-muted-foreground leading-relaxed'}>
            {insightsPageTexts.criticalInsight.description}
        </p>

        <div className={'mt-6 flex items-center gap-3'}>
            <Button className={'bg-primary hover:bg-primary/90 text-primary-foreground'}>
                {insightsPageTexts.criticalInsight.buttonPrimary}
            </Button>
            <Button variant={'ghost'} className={'text-muted-foreground'}>
                <BarChart3 className={'mr-2 h-4 w-4'}/>
                {insightsPageTexts.criticalInsight.buttonSecondary}
            </Button>
        </div>
    </div>
)
