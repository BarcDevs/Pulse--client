import { useTranslations } from 'next-intl'

import { ChipButton } from '@/components/shared/buttons/ChipButton'

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
                <ChipButton
                    key={id}
                    type={'button'}
                    isSelected={id === value}
                    onClick={() => onChange(id)}
                >
                    {t(supportLocales.contact.topics[id])}
                </ChipButton>
            ))}
        </div>
    )
}
