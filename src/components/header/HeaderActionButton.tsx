import {renderIcon} from '@/components/header/renderIcon'
import {Button} from '@/components/ui/button'

import type {ActionConfig} from '@/constants/config/headerPageConfigs'

type HeaderActionButtonProps = {
    action: ActionConfig
}

export const HeaderActionButton = ({
    action
}: HeaderActionButtonProps) => {
    const isOutline = action.variant === 'outline'
    const isNewPost = action.type === 'newPost'

    return (
        <Button
            variant={isOutline ? 'outline' : 'default'}
            className={
                isNewPost
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : isOutline
                        ? 'text-muted-foreground'
                        : ''
            }
        >
            {renderIcon(action.icon)}
            {action.label}
        </Button>
    )
}
