import { Sparkles } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
    DASHBOARD_AI_INSIGHT_LABEL,
    DASHBOARD_AI_INSIGHT_TEXT,
} from '@/constants/dashboardTexts'

export const DashboardAIInsight = () => (
  <Card className={'border-0 shadow-sm'}>
    <CardHeader className={'pb-2'}>
      <div className={'flex items-center gap-2'}>
        <Sparkles className={'size-4 text-accent'} />
        <CardTitle className={'text-sm font-medium text-muted-foreground'}>
          {DASHBOARD_AI_INSIGHT_LABEL}
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <blockquote className={'border-l-2 border-primary pl-4 italic text-foreground'}>
        {DASHBOARD_AI_INSIGHT_TEXT}
      </blockquote>
    </CardContent>
  </Card>
)
