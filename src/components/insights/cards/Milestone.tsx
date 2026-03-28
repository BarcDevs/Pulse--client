import {Trophy} from 'lucide-react'

import {Card, CardContent} from '@/components/ui/card'

import {insightsDetail} from '@/constants/componentTexts/insightsDetail'

export const InsightsMilestone = () => {
    return (
        <Card className={'border-0 bg-accent text-white shadow-sm'}>
            <CardContent className={'pt-6'}>
                <div className={'flex items-start gap-3'}>
                    <Trophy className={'size-8'}/>
                    <div>
                        <h3 className={'text-xl font-semibold'}>
                            {insightsDetail.milestone.title}
                        </h3>
                        <p className={'mt-2 text-white/90'}>
                            {insightsDetail.milestone.description}
                        </p>
                        <p className={'mt-4 text-xs font-medium uppercase tracking-wider text-white/60'}>
                            {insightsDetail.milestone.level}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
