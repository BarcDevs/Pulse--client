import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'

import * as InsightsComponentTexts from '@/constants/insightsComponentTexts'

export const InsightsHeader = () => (
    <Card className={'border-0 shadow-sm'}>
        <CardContent className={'pt-6'}>
            <Badge className={'mb-4 border-0 bg-red-100 text-red-600'}>
                {InsightsComponentTexts.INSIGHTS_HEADER_BADGE}
            </Badge>
            <h2 className={'text-2xl font-semibold text-foreground text-balance'}>
                {InsightsComponentTexts.INSIGHTS_HEADER_TITLE}
            </h2>
            <p className={'mt-3 text-muted-foreground'}>
                {InsightsComponentTexts.INSIGHTS_HEADER_DESCRIPTION}
            </p>
            <div className={'mt-6 flex gap-3'}>
                <Button className={'bg-primary text-white hover:bg-primary/90'}>
                    {InsightsComponentTexts.INSIGHTS_HEADER_BUTTON_PRIMARY}
                </Button>
                <Button variant={'outline'}>
                    {InsightsComponentTexts.INSIGHTS_HEADER_BUTTON_SECONDARY}
                </Button>
            </div>
        </CardContent>
    </Card>
)
