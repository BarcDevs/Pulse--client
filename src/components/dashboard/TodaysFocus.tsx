import { Brain } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
    DASHBOARD_TODAYS_FOCUS_BADGE,
    DASHBOARD_TODAYS_FOCUS_DESCRIPTION,
    DASHBOARD_TODAYS_FOCUS_LABEL,
    DASHBOARD_TODAYS_FOCUS_TITLE,
} from '@/constants/dashboardTexts'

export const DashboardTodaysFocus = () => (
  <Card className={'border-0 shadow-sm'}>
    <CardHeader className={'pb-3'}>
      <div className={'flex items-center justify-between'}>
        <CardTitle className={'text-base font-medium text-muted-foreground'}>
          {DASHBOARD_TODAYS_FOCUS_LABEL}
        </CardTitle>
        <Badge
          variant={'secondary'}
          className={'bg-primary-light text-primary'}
        >
          {DASHBOARD_TODAYS_FOCUS_BADGE}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className={'flex items-start gap-4'}>
        <div className={'flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-light'}>
          <Brain className={'size-6 text-primary'} />
        </div>
        <div>
          <h3 className={'text-xl font-semibold text-foreground'}>
            {DASHBOARD_TODAYS_FOCUS_TITLE}
          </h3>
          <p className={'mt-1 text-sm text-muted-foreground'}>
            {DASHBOARD_TODAYS_FOCUS_DESCRIPTION}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
)
