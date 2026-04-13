import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { insightsPageTexts }
    from '@/constants/componentTexts/insightsComponent'

export const InsightsHeader = () => (
    <Card className={'border-0 shadow-sm'}>
        <CardContent className={'pt-6'}>
            <Badge className={'mb-4 border-0 bg-red-100 text-red-600'}>
                {insightsPageTexts.header.badge}
            </Badge>
            <h2 className={'text-2xl font-semibold text-foreground text-balance'}>
                {insightsPageTexts.header.title}
            </h2>
            <p className={'mt-3 text-muted-foreground'}>
                {insightsPageTexts.header.description}
            </p>
            <div className={'mt-6 flex gap-3'}>
                <Button className={'bg-primary text-white hover:bg-primary/90'}>
                    {insightsPageTexts.header.buttonPrimary}
                </Button>
                <Button variant={'outline'}>
                    {insightsPageTexts.header.buttonSecondary}
                </Button>
            </div>
        </CardContent>
    </Card>
)
