'use client'

import { ElementType } from 'react'

import { useTranslations } from 'next-intl'

import {
    BookOpen,
    Brain,
    Dumbbell,
    Heart,
    Moon,
    PenLine,
    Users
} from 'lucide-react'

import {
    Card,
    CardContent,
    CardHeader
} from '@/components/ui/card'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import { DEFAULT_ACTIVITIES } from '@/config/defaultActivities'

import { checkInLocales } from '@/locales/checkInLocales'
import { dashboardLocales } from '@/locales/dashboardLocales'

import { TodaysFocusSkeletons } from './TodaysFocusSkeletons'

type DefaultActivity = typeof DEFAULT_ACTIVITIES[number]

const ACTIVITY_ICONS: Record<DefaultActivity, ElementType> = {
    Meditation: Brain,
    Exercise: Dumbbell,
    'Social time': Users,
    Reading: BookOpen,
    Journaling: PenLine,
    Therapy: Heart,
    Rest: Moon
}

export const DashboardTodaysFocus = () => {
    const t = useTranslations()
    const { data: stats, isLoading } = useCheckInStats('weekly')

    const rawActivity = stats?.topActivities?.[0]
    const matchedActivity = DEFAULT_ACTIVITIES.find(
        (a) => a.toLowerCase() === rawActivity?.toLowerCase()
    ) ?? DEFAULT_ACTIVITIES[0]

    const activityLabels = t.raw(checkInLocales.activities.default) as Record<string, string>
    const activityLabel = activityLabels[matchedActivity] ?? matchedActivity

    const Icon = ACTIVITY_ICONS[matchedActivity] ?? Brain
    const isPersonalized = !!rawActivity
    // TODO(MVP): replace with AI-generated reflective insight — deterministic backend signals + lightweight AI phrasing

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'pb-2'}>
                <div className={'flex items-start justify-between gap-3'}>
                    <div>
                        <h4 className={'text-base font-semibold text-foreground leading-snug'}>
                            {t(dashboardLocales.todaysFocus.title)}
                        </h4>
                        <p className={'mt-0.5 text-xs font-medium tracking-widest text-muted-foreground uppercase'}>
                            {t(dashboardLocales.todaysFocus.label)}
                        </p>
                    </div>
                    <div className={'flex--center size-10 shrink-0 rounded-xl bg-primary-light'}>
                        <Icon className={'size-5 text-primary'}/>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <TodaysFocusSkeletons/>
                ) : (
                    <>
                        <p className={'text-xl font-bold text-foreground leading-snug'}>
                            {isPersonalized
                                ? t(dashboardLocales.todaysFocus.observation, { activity: activityLabel })
                                : t(dashboardLocales.todaysFocus.description)
                            }
                        </p>
                        {isPersonalized && (
                            <p className={'mt-3 text-sm text-muted-foreground'}>
                                {t(dashboardLocales.todaysFocus.supportCopy)}
                            </p>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    )
}
