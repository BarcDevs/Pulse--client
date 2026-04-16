import { Goal } from '@/types/goals'

type DraftGoalCardProps = {
    goal: Goal
    onEdit?: () => void
}

export const DraftGoalCard = ({
    goal,
    onEdit
}: DraftGoalCardProps) => (
    <div className={'bg-surface-container-low rounded-xl p-8 border-2 border-dashed border-outline-variant/30 hover:border-primary/30 transition-colors cursor-pointer group'}>
        <div className={'flex items-center justify-between'}>
            <div>
                <h4 className={'text-xl font-headline font-bold text-on-surface-variant group-hover:text-primary transition-colors'}>
                    {goal.title}
                </h4>
                <p className={'text-on-surface-variant/60 mt-1'}>
                    {goal.metaText}
                </p>
            </div>
            <button
                onClick={onEdit}
                className={'bg-surface-container-lowest p-3 rounded-xl text-on-surface-variant shadow-sm group-hover:text-primary transition-all'}
            >
                <span
                    className={'material-symbols-outlined'}
                    data-icon={'edit'}
                >
                    edit
                </span>
            </button>
        </div>
    </div>
)
