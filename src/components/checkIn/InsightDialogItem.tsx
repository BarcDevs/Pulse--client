import type { CheckInInsight } from '@/types/checkIn'

import { getInsightTypeStyle } from '@/lib/insights/getInsightTypeStyle'
import { cn } from '@/lib/utils'

type InsightDialogItemProps = {
    insight: CheckInInsight
}

export const InsightDialogItem = ({
    insight
}: InsightDialogItemProps) => (
    <div className={cn(
        'space-y-2 rounded-md border-s-4 p-3',
        getInsightTypeStyle(insight.type)
    )}
    >
        <p className={'text-sm font-medium text-foreground'}>
            {insight.title}
        </p>
        <p className={'whitespace-pre-line text-sm text-foreground'}>
            {insight.content}
        </p>
    </div>
)
