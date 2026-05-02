import { ReactNode } from 'react'

import {
    Activity,
    Check,
    Lock
} from 'lucide-react'

export const milestoneStatusIcons: Record<string, ReactNode> = {
    COMPLETED: <Check className={'w-8 h-8 text-primary-foreground'}/>,
    ACTIVE: <Activity className={'w-8 h-8 text-primary-foreground'}/>,
    LOCKED: <Lock className={'w-8 h-8 text-outline'}/>
}