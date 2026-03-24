'use client'

import {useState} from 'react'

import {ArrowUpRight, TrendingUp} from 'lucide-react'

import {Button} from '@/components/ui/button'

import {cn} from '@/lib/utils'

// todo: centralised import
import {
    INSIGHTS_BEHAVIORAL_PATTERNS_CORRELATION_DESCRIPTION,
    INSIGHTS_BEHAVIORAL_PATTERNS_CORRELATION_LABEL,
    INSIGHTS_BEHAVIORAL_PATTERNS_CORRELATION_TITLE,
    INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_DESCRIPTION,
    INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_LABEL,
    INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_STAT,
    INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_STAT_LABEL,
    INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_TITLE,
    INSIGHTS_BEHAVIORAL_PATTERNS_PREDICTION_CONFIDENCE,
    INSIGHTS_BEHAVIORAL_PATTERNS_PREDICTION_DESCRIPTION,
    INSIGHTS_BEHAVIORAL_PATTERNS_PREDICTION_LABEL,
    INSIGHTS_BEHAVIORAL_PATTERNS_PREDICTION_TITLE,
    INSIGHTS_BEHAVIORAL_PATTERNS_TAB_7DAYS,
    INSIGHTS_BEHAVIORAL_PATTERNS_TAB_30DAYS,
    INSIGHTS_BEHAVIORAL_PATTERNS_TITLE
} from '@/constants/insightsComponentTexts'

export const BehavioralPatterns = () => {
    const [activeTab, setActiveTab] =
        useState<'7days' | '30days'>('30days')

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center justify-between mb-6'}>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {INSIGHTS_BEHAVIORAL_PATTERNS_TITLE}
                </h3>
                <div className={'flex gap-1 rounded-lg bg-surface-section p-1'}>
                    <Button
                        onClick={() => setActiveTab('7days')}
                        variant={
                            activeTab === '7days'
                                ? 'default'
                                : 'ghost'
                        }
                        size={'sm'}
                        className={cn(
                            'rounded-md text-xs font-medium',
                            activeTab === '7days'
                                ? 'bg-surface-card text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        {INSIGHTS_BEHAVIORAL_PATTERNS_TAB_7DAYS}
                    </Button>
                    <Button
                        onClick={() => setActiveTab('30days')}
                        variant={
                            activeTab === '30days'
                                ? 'default'
                                : 'ghost'
                        }
                        size={'sm'}
                        className={`rounded-md text-xs font-medium ${
                            activeTab === '30days'
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        {INSIGHTS_BEHAVIORAL_PATTERNS_TAB_30DAYS}
                    </Button>
                </div>
            </div>

            <div className={'grid grid-cols-1 md:grid-cols-3 gap-6'}>
                {/* Correlation Card */}
                <div className={'space-y-3'}>
                    <div className={'flex items-center gap-2'}>
            <span className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
              {INSIGHTS_BEHAVIORAL_PATTERNS_CORRELATION_LABEL}
            </span>
                        <ArrowUpRight className={'h-3 w-3 text-muted-foreground'}/>
                    </div>
                    <h4 className={'text-base font-medium text-foreground'}>
                        {INSIGHTS_BEHAVIORAL_PATTERNS_CORRELATION_TITLE}
                    </h4>
                    <p className={'text-sm text-muted-foreground leading-relaxed'}>
                        {INSIGHTS_BEHAVIORAL_PATTERNS_CORRELATION_DESCRIPTION}
                    </p>
                    {/* Mini bar chart */}
                    <div className={'flex items-end gap-1 h-12 mt-2'}>
                        {[40, 65, 50, 80, 45, 70, 55].map((height, i) => (
                            <div
                                key={i}
                                className={'flex-1 bg-primary/20 rounded-t'}
                                style={{ height: `${height}%` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Observation Card */}
                <div className={'space-y-3'}>
                    <div className={'flex items-center gap-2'}>
            <span className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
              {INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_LABEL}
            </span>
                    </div>
                    <h4 className={'text-base font-medium text-foreground'}>
                        {INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_TITLE}
                    </h4>
                    <p className={'text-sm text-muted-foreground leading-relaxed'}>
                        {INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_DESCRIPTION}
                    </p>
                    <div className={'mt-4'}>
                        <div className={'text-3xl font-bold text-foreground'}>
                            {INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_STAT}
                        </div>
                        <p className={'text-xs text-muted-foreground'}>
                            {INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_STAT_LABEL}
                        </p>
                    </div>
                </div>

                {/* AI Prediction Card */}
                <div className={'rounded-xl bg-primary p-5 text-primary-foreground'}>
          <span className={'text-xs font-medium uppercase tracking-wider opacity-80'}>
            {INSIGHTS_BEHAVIORAL_PATTERNS_PREDICTION_LABEL}
          </span>
                    <h4 className={'mt-2 text-base font-medium'}>
                        {INSIGHTS_BEHAVIORAL_PATTERNS_PREDICTION_TITLE}
                    </h4>
                    <p className={'mt-2 text-sm opacity-80 leading-relaxed'}>
                        {INSIGHTS_BEHAVIORAL_PATTERNS_PREDICTION_DESCRIPTION}
                    </p>
                    <div className={'mt-4 flex items-center gap-2 text-xs'}>
                        <TrendingUp className={'h-4 w-4'}/>
                        {INSIGHTS_BEHAVIORAL_PATTERNS_PREDICTION_CONFIDENCE}
                    </div>
                </div>
            </div>
        </div>
    )
}
