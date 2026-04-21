type MilestoneProgressBarProps = {
    percentage: number
    color: string
}

export const MilestoneProgressBar = ({
    percentage,
    color
}: MilestoneProgressBarProps) => (
    <div className={'h-1 w-full bg-white/10 rounded-full overflow-hidden'}>
        <div
            className={`h-full ${color} rounded-full transition-all`}
            style={{ width: `${percentage}%` }}
        />
    </div>
)
