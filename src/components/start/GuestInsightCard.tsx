'use client'

import { useTranslations } from 'next-intl'

import { Sparkles } from 'lucide-react'

import type { CheckIn } from '@/types/checkIn'

import { getDisplayInsights } from '@/lib/insights/getLatestInsights'
import { cn } from '@/lib/utils'

import { startLocales } from '@/locales/startLocales'

import { GuestInsightSkeletons } from './GuestInsightSkeletons'
import { GuestInsightText } from './GuestInsightText'

type GuestInsightCardProps = {
    checkIn: CheckIn | null | undefined
}

export const GuestInsightCard = ({
    checkIn
}: GuestInsightCardProps) => {
    const t = useTranslations()
    const insights = getDisplayInsights(checkIn?.insights)
    const isPending = !checkIn || checkIn.insightsStatus === 'pending'
    const isEmpty = !isPending && !insights.length

    return (
        <section
            aria-live={'polite'}
            aria-busy={isPending}
            className={'min-h-49 rounded-2xl border border-accent-ai/20 bg-accent-ai-light p-5.5 md:px-10 md:py-9'}
        >
            <div className={'mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground rtl:text-[13px] rtl:tracking-normal rtl:normal-case'}>
                <span className={'flex size-7 items-center justify-center rounded-full bg-card'}>
                    <Sparkles className={cn('size-3.75 text-accent-ai', isPending && 'animate-pulse')}/>
                </span>
                {t(startLocales.result.eyebrow)}
            </div>
            {isPending && !insights.length && <GuestInsightSkeletons/>}
            {insights.map((insight) => (
                <GuestInsightText
                    key={insight.id}
                    title={insight.title}
                    content={insight.content}
                />
            ))}
            {isEmpty && (
                <p className={'text-base text-muted-foreground'}>
                    {t(startLocales.result.insightEmpty)}
                </p>
            )}
        </section>
    )
}
