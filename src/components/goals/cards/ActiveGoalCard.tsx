import { Goal } from '@/types/goals'

import { Badge } from '@/components/ui/badge'

import { GoalChecklistItem } from '../GoalChecklistItem'
import { ProgressRing } from '../ProgressRing'

type ActiveGoalCardProps = {
    goal: Goal
    onChecklistChange?: (
        itemId: string,
        completed: boolean
    ) => void
    onAddStep?: () => void
}

export const ActiveGoalCard = ({
    goal,
    onChecklistChange,
    onAddStep
}: ActiveGoalCardProps) => (
    <div className={'bg-surface-container-lowest rounded-xl p-8 transition-all duration-300'}>
        <div className={'flex flex-col md:flex-row md:items-start gap-8'}>
            <div className={'flex-1'}>
                <div className={'flex items-center gap-3 mb-2'}>
                    <Badge className={'px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border-0'}>
                        {goal.badge}
                    </Badge>
                    <span className={'text-on-surface-variant text-sm font-medium'}>
                        {goal.metaText}
                    </span>
                </div>
                <h4 className={'text-2xl font-headline font-bold text-on-surface mb-3'}>
                    {goal.title}
                </h4>
                <p className={'text-on-surface-variant leading-relaxed mb-8'}>
                    {goal.description}
                </p>

                <div className={'space-y-3'}>
                    {goal.checklist?.map((item) => (
                        <GoalChecklistItem
                            key={item.id}
                            text={item.text}
                            completed={item.completed}
                            onChange={(completed) =>
                                onChecklistChange?.(item.id, completed)
                            }
                        />
                    ))}
                </div>

                <div className={'pt-2'}>
                    <button
                        onClick={onAddStep}
                        className={'flex items-center gap-2 text-primary font-medium text-sm hover:opacity-70 transition-opacity'}
                    >
                        <span
                            className={'material-symbols-outlined text-sm'}
                            data-icon={'add'}
                        >
                            add
                        </span>
                        <span>Add a step...</span>
                    </button>
                </div>
            </div>

            <ProgressRing percentage={goal.completionPercentage || 0}/>
        </div>
    </div>
)
