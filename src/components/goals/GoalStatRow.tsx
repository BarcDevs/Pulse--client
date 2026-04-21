type GoalStatRowProps = {
    label: string
    percentage: number
}

export const GoalStatRow = ({
    label,
    percentage
}: GoalStatRowProps) => (
    <div className={'flex items-center justify-between py-3 border-b border-white/10'}>
        <span className={'text-sm text-white/80'}>
            {label}
        </span>

        <span className={'font-bold text-white'}>
            {percentage}%
        </span>
    </div>
)
