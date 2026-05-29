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

import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import { DEFAULT_ACTIVITIES } from '@/config/defaultActivities'

import { dashboardLocales } from '@/locales/dashboardLocales'

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
    ) ?? 'Meditation'

    const activityLabels = t.raw('checkIn.activities.default') as Record<string, string>
    const activityLabel = activityLabels[matchedActivity] ?? matchedActivity

    const Icon = ACTIVITY_ICONS[matchedActivity] ?? Brain
    const isPersonalized = !!rawActivity
    // TODO(MVP): replace with AI-generated reflective insight — deterministic backend signals + lightweight AI phrasing
    const description = isPersonalized
        ? t(dashboardLocales.todaysFocus.supportiveDescription, {
            activity: activityLabel
        }) : t(dashboardLocales.todaysFocus.description)

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'pb-3'}>
                <div className={'flex items-center justify-between'}>
                    <CardTitle className={'text-base font-medium text-muted-foreground'}>
                        {t(dashboardLocales.todaysFocus.label)}
                    </CardTitle>
                    <Badge
                        variant={'secondary'}
                        className={'bg-primary-light text-primary'}
                    >
                        {t(dashboardLocales.todaysFocus.badge)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className={'flex items-center gap-4'}>
                    <div className={'flex--center size-12 shrink-0 rounded-xl bg-primary-light'}>
                        <Icon className={'size-6 text-primary'}/>
                    </div>
                    <div className={'flex-1'}>
                        {isLoading ? (
                            <>
                                <Skeleton className={'h-7 w-40 mb-2'}/>
                                <Skeleton className={'h-4 w-64'}/>
                            </>
                        ) : (
                            <>
                                <h3 className={'text-xl font-semibold text-foreground'}>
                                    {activityLabel}
                                </h3>
                                <p className={'mt-1 text-sm text-muted-foreground'}>
                                    {description}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
