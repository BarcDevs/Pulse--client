'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { landingLocales } from '@/locales/landingLocales'

import { ChartStat } from './ChartStat'

const CHART_BARS = [6, 5, 7, 9, 6, 7, 8]
const CHART_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const CHART_PEAK_INDEX = 3

export const RecoveryChartPreview = () => {
    const t = useTranslations()
    const maxBar = Math.max(...CHART_BARS)

    return (
        <div className={'overflow-hidden rounded-2xl bg-linear-to-br from-primary-deep to-foreground p-7 shadow-xl'}>
            <p className={'mb-4 text-xs uppercase tracking-widest text-white/50'}>
                {t(landingLocales.howItWorks.chartLabel)}
            </p>

            <div className={'mb-2 flex h-24 items-end gap-1.5'}>
                {CHART_BARS.map((value, i) => (
                    <div
                        key={i}
                        className={cn(
                            'flex-1 rounded-t',
                            i === CHART_PEAK_INDEX ? 'bg-primary' : 'bg-white/15'
                        )}
                        style={{ height: `${(value / maxBar) * 100}%` }}
                    />
                ))}
            </div>

            <div className={'mb-5 flex justify-around'}>
                {CHART_DAYS.map((day, i) => (
                    <span
                        key={day}
                        className={cn(
                            'text-xs',
                            i === CHART_PEAK_INDEX
                                ? 'text-chart-highlight'
                                : 'text-white/35'
                        )}
                    >
                        {day}
                    </span>
                ))}
            </div>

            <div className={'flex gap-6 border-t border-white/10 pt-5'}>
                <ChartStat label={'MOOD'} value={'8/10'}/>
                <ChartStat label={'STREAK'} value={'142'} highlight/>
                <ChartStat label={'PROGRESS'} value={'+15%'}/>
            </div>
        </div>
    )
}
