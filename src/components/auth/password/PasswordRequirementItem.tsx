import {Check} from 'lucide-react'

import {cn} from '@/lib/utils'

type PasswordRequirementItemProps = {
    isMet: boolean
    label: string
}

export const PasswordRequirementItem = ({
    isMet,
    label
}: PasswordRequirementItemProps) => (
    <div className={'flex items-center gap-2'}>
        <div
            className={cn(
                'flex size-5 items-center justify-center rounded-full',
                isMet ?
                    'bg-secondary text-white' :
                    'bg-muted'
            )}
        >
            {isMet && <Check className={'size-3'}/>}
        </div>
        <span
            className={
                isMet ?
                    'text-secondary' :
                    'text-muted-foreground'
            }
        >
            {label}
        </span>
    </div>
)
