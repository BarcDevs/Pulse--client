type GoalChecklistItemProps = {
    text: string
    completed: boolean
    onChange?: (completed: boolean) => void
}

export const GoalChecklistItem = ({
    text,
    completed,
    onChange
}: GoalChecklistItemProps) => (
    <div className={'flex items-center gap-4 group cursor-pointer'}>
        <button
            onClick={() => onChange?.(!completed)}
            className={
                'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all '
                + (completed
                    ? 'border-primary bg-primary text-white'
                    : 'border-outline-variant hover:border-primary bg-transparent'
                )
            }
        >
            {completed && (
                <span className={'material-symbols-outlined text-sm'} style={{ fontVariationSettings: "'wght' 700" }}>
                    check
                </span>
            )}
        </button>
        <span className={'text-on-surface font-medium'}>
            {text}
        </span>
    </div>
)
