import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { TOPIC_ITEMS } from '@/constants/supportContent'

import { supportLocales } from '@/locales/supportLocales'

export const TopicCards = () => {
    const t = useTranslations()

    return (
        <>
            <h3 className={'mb-4 text-lg font-bold text-on-surface'}>
                {t(supportLocales.topics.title)}
            </h3>
            <div className={'mb-10 grid grid-cols-2 gap-3.5 md:grid-cols-3'}>
                {TOPIC_ITEMS.map((item) => (
                    <Button
                        key={item.id}
                        variant={'outline'}
                        className={cn('h-auto flex-col items-start whitespace-normal rounded-[14px] border-border bg-card p-[22px] text-start transition-all hover:bg-card', item.hoverClass)}
                    >
                        <div className={cn('mb-3.5 flex size-[38px] items-center justify-center rounded-[10px]', item.bgClass)}>
                            <item.icon className={cn('size-[18px]', item.textClass)}/>
                        </div>
                        <p className={'mb-1 text-[15px] font-bold text-on-surface'}>
                            {t(item.titleKey)}
                        </p>
                        <p className={'mb-3 text-[12.5px] font-normal leading-[1.55] text-muted-foreground'}>
                            {t(item.descKey)}
                        </p>
                        <span className={cn('text-[11px] font-semibold', item.textClass)}>
                            {`${t(supportLocales.topics.articles, { count: item.count })} →`}
                        </span>
                    </Button>
                ))}
            </div>
        </>
    )
}
