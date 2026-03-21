import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import {
    INSIGHTS_HEADER_BADGE,
    INSIGHTS_HEADER_BUTTON_PRIMARY,
    INSIGHTS_HEADER_BUTTON_SECONDARY,
    INSIGHTS_HEADER_DESCRIPTION,
    INSIGHTS_HEADER_TITLE,
} from '@/constants/insightsComponentTexts'

export const InsightsHeader = () => {
  return (
    <Card className={'border-0 shadow-sm'}>
      <CardContent className={'pt-6'}>
        <Badge className={'mb-4 border-0 bg-red-100 text-red-600'}>
          {INSIGHTS_HEADER_BADGE}
        </Badge>
        <h2 className={'text-2xl font-semibold text-foreground text-balance'}>
          {INSIGHTS_HEADER_TITLE}
        </h2>
        <p className={'mt-3 text-muted-foreground'}>
          {INSIGHTS_HEADER_DESCRIPTION}
        </p>
        <div className={'mt-6 flex gap-3'}>
          <Button className={'bg-primary text-white hover:bg-primary/90'}>
            {INSIGHTS_HEADER_BUTTON_PRIMARY}
          </Button>
          <Button variant={'outline'}>
            {INSIGHTS_HEADER_BUTTON_SECONDARY}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
