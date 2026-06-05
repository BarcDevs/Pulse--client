import { useTranslations } from 'next-intl'

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts'

import { insightsLocales } from '@/locales/insightsLocales'
import { PATTERNS_SOCIAL_DATA } from '@/mocks/chartData'

export const CorrelationCard = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-xl bg-surface-section p-4'}>
            <p className={'label-uppercase text-muted-foreground'}>
                {t(insightsLocales.behavioralPatterns.correlation.label)}
            </p>
            <h4 className={'mt-1 font-semibold text-foreground'}>
                {t(insightsLocales.behavioralPatterns.correlation.title)}
            </h4>
            <p className={'mt-2 text-sm text-muted-foreground'}>
                {t(insightsLocales.behavioralPatterns.correlation.description)}
            </p>
            <div className={'mt-4 h-24'}>
                <ResponsiveContainer
                    width={'100%'}
                    height={'100%'}
                >
                    <BarChart data={PATTERNS_SOCIAL_DATA}>
                        <XAxis dataKey={'day'} hide/>
                        <YAxis hide/>
                        <Bar
                            dataKey={'value'}
                            fill={'var(--primary)'}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}