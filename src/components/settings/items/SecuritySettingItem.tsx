import { ReactNode } from 'react'

import { Edit2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { securitySettingStyles } from '@/constants/securitySettings'

type SecuritySettingItemProps = {
    icon: ReactNode
    label: string
    value: string
    variant?: 'default' | 'destructive'
    buttonText?: string
    onClickAction: () => void
}

export const SecuritySettingItem = ({
    icon,
    label,
    value,
    variant = 'default',
    buttonText,
    onClickAction
}: SecuritySettingItemProps) => {
    const styles = securitySettingStyles[variant]
    const isDestructive = variant === 'destructive'

    return (
        <div className={styles.container}>
            <div className={'flex items-center gap-3'}>
                {icon}
                <div>
                    <h4 className={styles.label}>
                        {label}
                    </h4>
                    <p className={'text-sm text-muted-foreground'}>
                        {value}
                    </p>
                </div>
            </div>
            <Button
                variant={isDestructive ? 'destructive' : 'ghost'}
                size={'sm'}
                className={styles.button}
                onClick={onClickAction}
            >
                {isDestructive
                    ? buttonText
                    : <Edit2 className={'h-4 w-4 text-muted-foreground'}/>
                }
            </Button>
        </div>
    )
}
