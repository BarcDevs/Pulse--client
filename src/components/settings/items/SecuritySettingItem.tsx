import {Edit2} from 'lucide-react'

import {Button} from '@/components/ui/button'

type SecuritySettingItemProps = {
    icon: React.ReactNode
    label: string
    value: string
    variant?: 'default' | 'destructive'
}

export const SecuritySettingItem = ({
    icon,
    label,
    value,
    variant = 'default'
}: SecuritySettingItemProps) => (
    <div
        className={variant === 'destructive' ?
            'flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5' :
            'flex items-center justify-between p-4 rounded-xl bg-surface-section'}
    >
        <div className={'flex items-center gap-3'}>
            {icon}
            <div>
                <h4
                    className={
                        variant === 'destructive' ?
                            'font-medium text-destructive' :
                            'font-medium text-foreground'
                    }
                >
                    {label}
                </h4>
                <p className={'text-sm text-muted-foreground'}>
                    {value}
                </p>
            </div>
        </div>
        {variant === 'default' &&
            <Button
                variant={'ghost'}
                size={'sm'}
                className={'h-8 w-8 p-0 rounded-lg hover:bg-surface-card'}
            >
                <Edit2 className={'h-4 w-4 text-muted-foreground'}/>
            </Button>}
    </div>
)
