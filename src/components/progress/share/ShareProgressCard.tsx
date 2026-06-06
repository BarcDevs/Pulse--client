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
                width: '600px',
                background: 'linear-gradient(135deg, #e8f4fd 0%, #d9f0ff 50%, #e6f5f2 100%)',
                padding: '32px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#1a2b3c',
                boxSizing: 'border-box',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                border: '2px solid #4a90e2'
            }

            const headerStyle: CSSProperties = {
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px'
            }

            const logoStyle: CSSProperties = {
                height: '48px',
                width: 'auto'
            }

            const titleWrapperStyle: CSSProperties = {
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: 1
            }

            const titleStyle: CSSProperties = {
                fontSize: '18px',
                fontWeight: '600',
                margin: 0,
                color: '#000000'
            }

            const streakPillStyle: CSSProperties = {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#e6f5f2',
                color: '#006b5b',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '600',
                width: 'fit-content'
            }

            const chartWrapperStyle: CSSProperties = {
                marginBottom: '32px',
                height: '200px'
            }

            const statsGridStyle: CSSProperties = {
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '24px'
            }

            const statCardStyle: CSSProperties = {
                textAlign: 'center',
                padding: '16px',
                backgroundColor: '#e6f5f2',
                borderRadius: '12px',
                border: '1px solid #c0e5dd'
            }

            const statValueStyle: CSSProperties = {
                fontSize: '32px',
                fontWeight: '700',
                color: '#006b5b',
                margin: '0 0 4px 0'
            }

            const statLabelStyle: CSSProperties = {
                fontSize: '13px',
                color: '#00a896',
                margin: 0,
                fontWeight: '500'
            }

            const footerStyle: CSSProperties = {
                textAlign: 'center',
                borderTop: '2px solid #4a90e2',
                paddingTop: '16px'
            }

            const taglineStyle: CSSProperties = {
                fontSize: '15px',
                fontWeight: '700',
                color: '#005da7',
                margin: '0 0 8px 0'
            }

            const ctaStyle: CSSProperties = {
                fontSize: '12px',
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
                                    <span style={{ fontSize: '12px' }}>
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
                                        fontSize: '14px'
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
