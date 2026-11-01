import { ReactNode } from 'react'

import { useTranslations } from 'next-intl'

import { Edit2 } from 'lucide-react'

import { Button } from '@/components/shared/buttons/Button'
import { IconButton } from '@/components/shared/buttons/IconButton'

import { securitySettingStyles } from '@/constants/securitySettings'

import { globalLocales } from '@/locales/globalLocales'

type SecuritySettingItemProps = {
    icon: ReactNode
    label: string
    value: string
    variant?: 'default' | 'destructive'
    buttonText?: string
    flat?: boolean
    onClickAction: () => void
}

export const SecuritySettingItem = ({
    icon,
    label,
    value,
    variant = 'default',
    buttonText,
    flat = false,
    onClickAction
}: SecuritySettingItemProps) => {
    const t = useTranslations()
    const styles = securitySettingStyles[variant]
    const isDestructive = variant === 'destructive'
    const containerClass = flat
        ? 'flex items-center justify-between p-4'
        : styles.container

    return (
        <div className={containerClass}>
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
            {isDestructive ? (
                <Button
                    variant={'destructive'}
                    size={'sm'}
                    onClick={onClickAction}
                >
                    {buttonText}
                </Button>
            ) : (
                <IconButton
                    size={'sm'}
                    onClick={onClickAction}
                    aria-label={t(globalLocales.a11y.edit)}
                >
                    <Edit2 className={'h-4 w-4'}/>
                </IconButton>
            )}
        </div>
    )
}
