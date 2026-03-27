import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Tabs,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs'

import {insightsDetail} from '@/constants/componentTexts/insightsDetail'

import {CorrelationCard} from './CorrelationCard'
import {ObservationCard} from './ObservationCard'
import {PredictionCard} from './PredictionCard'

export const InsightsPatterns = () => (
    <Card className={'mt-6 border-0 shadow-sm'}>
        <CardHeader className={'flex flex-row items-center justify-between'}>
            <CardTitle className={'text-lg font-semibold'}>
                {insightsDetail.patterns.title}
            </CardTitle>
            <Tabs
                defaultValue={'30'}
                className={'w-auto'}
            >
                <TabsList className={'h-8 bg-muted'}>
                    <TabsTrigger
                        value={'7'}
                        className={'h-6 px-3 text-xs'}
                    >
                        7 Days
                    </TabsTrigger>
                    <TabsTrigger
                        value={'30'}
                        className={'h-6 px-3 text-xs'}
                    >
                        30 Days
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </CardHeader>
        <CardContent>
            <div className={'grid gap-6 lg:grid-cols-3'}>
                <CorrelationCard/>
                <ObservationCard/>
                <PredictionCard/>
            </div>
        </CardContent>
    </Card>
)
