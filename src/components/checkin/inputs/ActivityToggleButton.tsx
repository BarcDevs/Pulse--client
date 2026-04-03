import {Button} from '@/components/ui/button'

import {cn} from '@/lib/utils'

type ActivityToggleButtonProps = {
    activity: string
    isSelected: boolean
    onToggle: (activity: string) => void
}

export const ActivityToggleButton = ({
    activity,
    isSelected,
    onToggle
}: ActivityToggleButtonProps) => (
    <Button
        key={activity}
        type={'button'}
        onClick={() => onToggle(activity)}
        variant={isSelected ? 'default' : 'secondary'}
        size={'sm'}
        className={cn(
            'rounded-full text-sm font-medium',
            isSelected ?
                'bg-primary text-white' :
                'bg-muted text-foreground hover:bg-muted/80'
        )}
    >
        {isSelected &&
            <span className={'mr-1'}>+</span>}
        {activity}
    </Button>
)
