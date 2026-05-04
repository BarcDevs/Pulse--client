'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Plus } from 'lucide-react'

import { GoalStatus } from '@/types/goals'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'

import { goalsLocales } from '@/locales/goalsLocales'

type GoalsFilterProps = {
    selectedStatuses: GoalStatus[]
    toggleStatus: (status: GoalStatus) => void
    onOpenCreateModal: () => void
}

export const GoalsFilter = ({
    selectedStatuses,
    toggleStatus,
    onOpenCreateModal
}: GoalsFilterProps) => {
    const t = useTranslations()
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    return (
        <div className={'flex gap-3'}>
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                    >
                        Filter
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align={'end'}
                    className={'w-56 p-4'}
                >
                    <div className={'space-y-3'}>
                        {Object.values(GoalStatus).map((status) => (
                            <div
                                key={status}
                                className={'flex items-center gap-3'}
                            >
                                <Checkbox
                                    id={`status-${status}`}
                                    checked={selectedStatuses.includes(status)}
                                    onCheckedChange={() => toggleStatus(status)}
                                />
                                <Label
                                    htmlFor={`status-${status}`}
                                    className={'text-sm font-medium cursor-pointer flex-1'}
                                >
                                    {t(goalsLocales.statusLabels[status])}
                                </Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
            <Button
                onClick={onOpenCreateModal}
                className={'bg-linear-to-r from-primary-gradient-start to-primary-gradient-end text-primary-foreground shadow-lg shadow-blue-500/20'}
            >
                <Plus className={'size-4 mr-2'}/>
                {t(goalsLocales.overview.newGoalButton)}
            </Button>
        </div>
    )
}