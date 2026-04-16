import { Goal } from '@/types/goals'

import { Badge } from '@/components/ui/badge'

type CompletedGoalCardProps = {
    goal: Goal
}

export const CompletedGoalCard = ({
    goal
}: CompletedGoalCardProps) => (
    <div className={'bg-secondary-container/20 rounded-xl p-8 border-none opacity-80'}>
        <div className={'flex items-start justify-between'}>
            <div className={'flex-1'}>
                <div className={'flex items-center gap-3 mb-2'}>
                    <Badge className={'px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest border-0'}>
                        {goal.badge}
                    </Badge>
                    <span className={'text-secondary/70 text-sm font-medium'}>
                        {goal.metaText}
                    </span>
                </div>
                <h4 className={'text-2xl font-headline font-bold text-on-surface-variant mb-3'}>
                    {goal.title}
                </h4>
                <p className={'text-on-surface-variant/70 leading-relaxed mb-6'}>
                    {goal.description}
                </p>

                <div className={'flex flex-wrap gap-4'}>
                    {goal.achievements?.map((achievement) => (
                        <div
                            key={achievement}
                            className={'flex items-center gap-2 py-1.5 px-3 rounded-lg bg-white/50 text-secondary text-sm font-medium'}
                        >
                            <span
                                className={'material-symbols-outlined text-sm'}
                                data-icon={'verified'}
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                verified
                            </span>
                            <span>{achievement}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={'hidden md:flex w-24 h-24 items-center justify-center bg-secondary/10 rounded-full text-secondary shrink-0'}>
                <span
                    className={'material-symbols-outlined text-5xl'}
                    data-icon={'emoji_events'}
                >
                    emoji_events
                </span>
            </div>
        </div>
    </div>
)
