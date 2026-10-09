import type { CheckInInsight } from '@/types/checkIn'

import { getInsightTypeStyle } from '@/lib/insights/getInsightTypeStyle'
import { cn } from '@/lib/utils'

type DashboardInsightItemProps = {
    insight: CheckInInsight
}

export const DashboardInsightItem = ({
    insight
}: DashboardInsightItemProps) => (
    <div className={cn(
        'space-y-0.5 rounded-md border-s-4 px-3 py-2',
        getInsightTypeStyle(insight.type)
    )}
    >
        <p className={'text-xs font-medium text-muted-foreground'}>
            {insight.title}
        </p>
        <blockquote className={'italic text-foreground text-sm px-1'}>
            {insight.content}
        </blockquote>
    </div>
)
