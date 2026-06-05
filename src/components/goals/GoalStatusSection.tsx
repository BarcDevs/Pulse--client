'use client'

import { useTranslations } from 'next-intl'

import { ChevronDown, PlusCircle } from 'lucide-react'

import { Goal, GoalStatus } from '@/types/goals'

import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'

import { GOAL_STATUS_TOKENS } from '@/lib/goals/tokens'
import { cn } from '@/lib/utils'

import { goalsLocales } from '@/locales/goalsLocales'

import { GoalCard } from './cards/GoalCard'

type GoalStatusSectionProps = {
    status: GoalStatus
    goals: Goal[]
    onEditAction: (goalId: string) => void
    onCreateAction?: () => void
}

export const GoalStatusSection = ({
    status,
    goals,
    onEditAction,
    onCreateAction
}: GoalStatusSectionProps) => {
    const t = useTranslations()
    const isActive = status === GoalStatus.ACTIVE
    const tok = GOAL_STATUS_TOKENS[status]

    return (
        <AccordionItem
            value={status}
            className={'border rounded-xl overflow-hidden'}
        >
            <AccordionTrigger className={'px-4 py-3 hover:no-underline hover:bg-surface-container-low [&>svg]:hidden'}>
                <div className={'flex items-center gap-3 w-full'}>
                    <span className={cn('w-2 h-2 rounded-full shrink-0', tok.dotCn)} />
                    <span className={'font-headline font-bold text-on-surface'}>
                        {t(goalsLocales.statusLabels[status])}
                    </span>
                    <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', tok.countBadgeCn)}>
                        {goals.length}
                    </span>
                    <ChevronDown className={'ml-auto h-4 w-4 shrink-0 text-on-surface-variant transition-transform duration-200 [[data-state=open]_&]:rotate-180'} />
                </div>
            </AccordionTrigger>
            <AccordionContent className={'px-4 pb-4 pt-2'}>
                <div className={cn('grid gap-4', goals.length === 0 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3')}>
                    {goals.map((goal) => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            onEditAction={onEditAction}
                        />
                    ))}
                    {isActive && (
                        <div
                            onClick={onCreateAction}
                            className={'border-2 border-dashed border-outline-variant bg-transparent p-6 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/50 transition-colors group'}
                        >
                            <div className={'w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'}>
                                <PlusCircle className={'w-6 h-6 text-outline'} />
                            </div>
                            <p className={'font-headline font-bold text-on-surface-variant'}>
                                {t(goalsLocales.overview.addGoalPlaceholder)}
                            </p>
                            <p className={'text-xs text-outline mt-1'}>
                                {t(goalsLocales.overview.addGoalSubtitle)}
                            </p>
                        </div>
                    )}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
