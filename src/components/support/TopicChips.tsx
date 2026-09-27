import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import {
    SUPPORT_TOPIC_IDS,
    type SupportTopicId
} from '@/constants/support'

import { supportLocales } from '@/locales/supportLocales'

type TopicChipsProps = {
    value: SupportTopicId
    onChange: (topic: SupportTopicId) => void
}

export const TopicChips = ({
    value,
    onChange
}: TopicChipsProps) => {
    const t = useTranslations()

    return (
        <div className={'flex flex-wrap gap-1.5'}>
            {SUPPORT_TOPIC_IDS.map((id) => (
                <Button
                    key={id}
                    type={'button'}
                    variant={'outline'}
                    onClick={() => onChange(id)}
                    className={cn(
                        'h-auto rounded-full border-[1.5px] px-3.5 py-1.5 text-xs font-semibold',
                        id === value
                            ? 'border-primary bg-primary-light text-primary hover:bg-primary-light hover:text-primary'
                            : 'border-border bg-card text-muted-foreground'
                    )}
                >
                    {t(supportLocales.contact.topics[id])}
                </Button>
            ))}
        </div>
    )
}
