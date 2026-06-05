import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import { chatLocales } from '@/locales/chatLocales'

export const NextMilestoneCard = () => {
    const t = useTranslations()

    return (
        <Card className={'border-0 bg-primary text-white shadow-none'}>
            <CardContent className={'pt-6'}>
                <p className={'label-uppercase opacity-80'}>
                    {t(chatLocales.sidebar.nextMilestoneLabel)}
                </p>
                <h3 className={'mt-1 text-lg font-semibold'}>
                    {t(chatLocales.sidebar.nextMilestoneTitle)}
                </h3>
                <Badge className={'mt-2 border-0 bg-white/20 text-white'}>
                    {t(chatLocales.sidebar.nextMilestoneBadge)}
                </Badge>
                <Progress
                    value={87}
                    className={'mt-4 h-2 bg-white/20'}
                />
            </CardContent>
        </Card>
    )
}
