import { Brain } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { dashboardPageTexts } from '@/constants/componentTexts/dashboard'

export const DashboardTodaysFocus = () => (
    <Card className={'border-0 shadow-sm'}>
        <CardHeader className={'pb-3'}>
            <div className={'flex items-center justify-between'}>
                <CardTitle className={'text-base font-medium text-muted-foreground'}>
                    {dashboardPageTexts.todaysFocus.label}
                </CardTitle>
                <Badge
                    variant={'secondary'}
                    className={'bg-primary-light text-primary'}
                >
                    {dashboardPageTexts.todaysFocus.badge}
                </Badge>
            </div>
        </CardHeader>
        <CardContent>
            <div className={'flex items-start gap-4'}>
                <div className={'flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-light'}>
                    <Brain className={'size-6 text-primary'}/>
                </div>
                <div>
                    <h3 className={'text-xl font-semibold text-foreground'}>
                        {dashboardPageTexts.todaysFocus.title}
                    </h3>
                    <p className={'mt-1 text-sm text-muted-foreground'}>
                        {dashboardPageTexts.todaysFocus.description}
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
)
