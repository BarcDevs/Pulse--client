import { useTranslations } from 'next-intl'

import { TextButton } from '@/components/shared/buttons/TextButton'

import { cn } from '@/lib/utils'

import { QUICK_HELP_ITEMS } from '@/constants/supportContent'

export const QuickHelpCards = () => {
    const t = useTranslations()

    return (
        <div className={'mb-9 grid grid-cols-1 gap-3.5 md:grid-cols-3'}>
            {QUICK_HELP_ITEMS.map((item) => (
                <div
                    key={item.id}
                    className={'flex items-center gap-3.5 rounded-[14px] border border-border bg-card p-5'}
                >
                    <div className={cn('flex size-11 shrink-0 items-center justify-center rounded-[11px]', item.bgClass)}>
                        <item.icon className={cn('size-5', item.textClass)}/>
                    </div>
                    <div className={'min-w-0 flex-1'}>
                        <p className={'text-sm font-bold text-on-surface'}>
                            {t(item.titleKey)}
                        </p>
                        <p className={'mt-0.5 text-xs text-muted-foreground'}>
                            {t(item.descKey)}
                        </p>
                    </div>
                    <TextButton
                        tone={'inherit'}
                        size={'xs'}
                        className={cn('whitespace-nowrap font-bold', item.textClass)}
                    >
                        {`${t(item.actionKey)} →`}
                    </TextButton>
                </div>
            ))}
        </div>
    )
}
