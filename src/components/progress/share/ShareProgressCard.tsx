'use client'

import {
    CSSProperties,
    forwardRef,
    type Ref
} from 'react'

import { useTranslations } from 'next-intl'

import {
    Area,
    AreaChart,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts'

import type { CheckInStats } from '@/types/checkIn'

import { wellnessColors } from '@/lib/wellnessColors'

import { appSettings } from '@/config/appSettings'

import { progressLocales } from '@/locales/progressLocales'

type ShareProgressCardProps = {
    stats: CheckInStats
    milestonesCompleted?: number
    userName?: string
}

export const ShareProgressCard =
    forwardRef<
        HTMLDivElement | null,
        ShareProgressCardProps
    >(
        (
            {
                stats,
                milestonesCompleted,
                userName
            }:
            ShareProgressCardProps,
            ref: Ref<HTMLDivElement | null>
        ) => {
            const t = useTranslations()
            const cardStyle: CSSProperties = {
                width: 'min(37.5em, 100%)',
                background: 'linear-gradient(135deg, #e8f4fd 0%, #d9f0ff 50%, #e6f5f2 100%)',
                padding: '2em',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#1a2b3c',
                boxSizing: 'border-box',
                borderRadius: '1em',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                border: '0.125em solid #4a90e2'
            }

            const headerStyle: CSSProperties = {
                display: 'flex',
                alignItems: 'center',
                gap: '1em',
                marginBottom: '1.5em'
            }

            const logoStyle: CSSProperties = {
                height: '3em',
                width: 'auto'
            }

            const titleWrapperStyle: CSSProperties = {
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25em',
                flex: 1
            }

            const titleStyle: CSSProperties = {
                fontSize: '1.125em',
                fontWeight: '600',
                margin: 0,
                color: '#000000'
            }

            const streakPillStyle: CSSProperties = {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375em',
                backgroundColor: '#e6f5f2',
                color: '#006b5b',
                padding: '0.375em 0.875em',
                borderRadius: '999px',
                fontSize: '0.8125em',
                fontWeight: '600',
                width: 'fit-content'
            }

            const chartWrapperStyle: CSSProperties = {
                marginBottom: '2em',
                height: '12.5em'
            }

            const statsGridStyle: CSSProperties = {
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1em',
                marginBottom: '1.5em'
            }

            const statCardStyle: CSSProperties = {
                textAlign: 'center',
                padding: '1em',
                backgroundColor: '#e6f5f2',
                borderRadius: '0.75em',
                border: '1px solid #c0e5dd'
            }

            const statValueStyle: CSSProperties = {
                fontSize: '2em',
                fontWeight: '700',
                color: '#006b5b',
                margin: '0 0 0.25em 0'
            }

            const statLabelStyle: CSSProperties = {
                fontSize: '0.8125em',
                color: '#00a896',
                margin: 0,
                fontWeight: '500'
            }

            const footerStyle: CSSProperties = {
                textAlign: 'center',
                borderTop: '0.125em solid #4a90e2',
                paddingTop: '1em'
            }

            const taglineStyle: CSSProperties = {
                fontSize: '0.9375em',
                fontWeight: '700',
                color: '#005da7',
                margin: '0 0 0.5em 0'
            }

            const ctaStyle: CSSProperties = {
                fontSize: '0.75em',
                color: '#4a90e2',
                margin: 0,
                fontWeight: '500'
            }

            return (
                <div ref={ref} style={cardStyle}>
                    <div style={headerStyle}>
                        <img
                            src={'/logos/PulseLogoNoCaption.webp'}
                            alt={appSettings.brandName}
                            style={logoStyle}
                        />
                        <div style={titleWrapperStyle}>
                            <h2 style={titleStyle}>
                                {t(progressLocales.share.title)}
                                {userName && (
                                    <span style={{ fontSize: '0.75em' }}>
                                    {` • ${userName}`}
                                </span>
                                )}
                            </h2>
                            <div style={streakPillStyle}>
                                🔥 {stats.currentStreak} {t(progressLocales.share.streakUnit)}
                            </div>
                        </div>
                    </div>

                    <div style={chartWrapperStyle}>
                        {
                            !stats.moodTrend
                            || stats.moodTrend.length === 0 ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        color: '#64748b',
                                        fontSize: '0.875em'
                                    }}
                                >
                                    {t(progressLocales.share.noMoodData)}
                                </div>
                            ) : (
                                <ResponsiveContainer
                                    width={'100%'}
                                    height={'100%'}
                                >
                                    <AreaChart data={stats.moodTrend}>
                                        <defs>
                                            <linearGradient
                                                id={'moodGradient'}
                                                x1={'0'}
                                                y1={'0'}
                                                x2={'0'}
                                                y2={'1'}
                                            >
                                                <stop
                                                    offset={'5%'}
                                                    stopColor={wellnessColors.mood.fill}
                                                    stopOpacity={0.9}
                                                />
                                                <stop
                                                    offset={'95%'}
                                                    stopColor={wellnessColors.mood.fill}
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey={'date'}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: '#64748b',
                                                fontSize: 12
                                            }}
                                        />
                                        <YAxis
                                            domain={[0, 10]}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fill: '#64748b',
                                                fontSize: 12
                                            }}
                                            width={30}
                                        />
                                        <Area
                                            type={'monotone'}
                                            dataKey={'actual'}
                                            stroke={wellnessColors.mood.primary}
                                            strokeWidth={2}
                                            fill={'url(#moodGradient)'}
                                        />
                                        {stats.moodTrend && stats.moodTrend.some(
                                            p => p.target !== undefined
                                        ) && (
                                            <Line
                                                type={'monotone'}
                                                dataKey={'target'}
                                                stroke={'#006b5b'}
                                                strokeDasharray={'5 5'}
                                                strokeWidth={1}
                                                dot={false}
                                            />
                                        )}
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                    </div>

                    <div style={statsGridStyle}>
                        <div style={statCardStyle}>
                            <p style={statValueStyle}>
                                {stats.currentStreak}
                            </p>
                            <p style={statLabelStyle}>
                                {t(progressLocales.share.currentStreakLabel)}
                            </p>
                        </div>
                        <div style={statCardStyle}>
                            <p style={statValueStyle}>
                                {stats.averageMoodScore.toFixed(1)}
                            </p>
                            <p style={statLabelStyle}>
                                {t(progressLocales.share.averageMoodLabel)}
                            </p>
                        </div>
                        <div style={statCardStyle}>
                            <p style={statValueStyle}>
                                {milestonesCompleted ?? 0}
                            </p>
                            <p style={statLabelStyle}>
                                {t(progressLocales.share.milestonesLabel)}
                            </p>
                        </div>
                    </div>

                    <div style={footerStyle}>
                        <p style={taglineStyle}>
                            {t(progressLocales.share.tagline)}
                        </p>
                        <p style={ctaStyle}>
                            {t(progressLocales.share.cta, {
                                brandName: appSettings.brandName
                            })}
                        </p>
                    </div>
                </div>
            )
        }
    )

ShareProgressCard.displayName = 'ShareProgressCard'
