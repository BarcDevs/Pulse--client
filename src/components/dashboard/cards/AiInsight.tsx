'use client'

import { Sparkles } from 'lucide-react'

import { ClassName } from '@/types/react'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { useCheckIns } from '@/hooks/queries/useCheckIns'

import { getLatestInsights } from '@/lib/insights/getLatestInsights'
import { cn } from '@/lib/utils'

import { dashboardPageTexts } from '@/constants/componentTexts/dashboard'

type DashboardAIInsightProps = {
    className?: ClassName
}

export const DashboardAIInsight = ({
    className
}: DashboardAIInsightProps) => {
    const { data: checkInsResponse } = useCheckIns(1)

    const insightText =
        getLatestInsights(checkInsResponse)

    return (
        <Card className={cn(
            'border-0 shadow-sm',
            className
        )}>
            <CardHeader>
                <div className={'flex items-center gap-2'}>
                    <Sparkles className={'size-4 text-accent'}/>
                    <CardTitle className={'text-sm font-medium text-muted-foreground'}>
                        {dashboardPageTexts.aiInsight.label}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <blockquote className={'border-l-2 border-primary pl-4 italic text-foreground'}>
                    {insightText}
                </blockquote>
            </CardContent>
        </Card>
    )
}
