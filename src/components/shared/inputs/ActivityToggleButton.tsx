import { ChipButton } from '@/components/shared/buttons/ChipButton'

type ActivityToggleButtonProps = {
    activity: string
    label?: string
    isSelected: boolean
    onToggle: (activity: string) => void
}

export const ActivityToggleButton = ({
    activity,
    label,
    isSelected,
    onToggle
}: ActivityToggleButtonProps) => (
    <ChipButton
        key={activity}
        type={'button'}
        solid
        size={'md'}
        isSelected={isSelected}
        onClick={() => onToggle(activity)}
    >
        {isSelected
            && <span className={'mr-1'}>{'+'}</span>}
        {label || activity}
    </ChipButton>
)
