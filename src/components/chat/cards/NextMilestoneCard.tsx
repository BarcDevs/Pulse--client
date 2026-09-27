import { useTranslations } from 'next-intl'

import { Badge } from '@/components/shared/badges/Badge'
import { Card } from '@/components/shared/cards/Card'
import { CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import { chatLocales } from '@/locales/chatLocales'

export const NextMilestoneCard = () => {
    const t = useTranslations()

    return (
        <Card variant={'primary'}>
            <CardContent className={'pt-6'}>
                <p className={'label-uppercase opacity-80'}>
                    {t(chatLocales.sidebar.nextMilestoneLabel)}
                </p>
                <h3 className={'mt-1 text-lg font-semibold'}>
                    {t(chatLocales.sidebar.nextMilestoneTitle)}
                </h3>
                <Badge
                    variant={'onGradient'}
                    className={'mt-2'}
                >
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
