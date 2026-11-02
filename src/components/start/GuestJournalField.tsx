import { useId } from 'react'

import { useTranslations } from 'next-intl'

import { Input } from '@/components/shared/inputs/Input'

import { startLocales } from '@/locales/startLocales'

type GuestJournalFieldProps = {
    value: string
    disabled: boolean
    onChange: (value: string) => void
}

const JOURNAL_MAX_LENGTH = 140

export const GuestJournalField = ({
    value,
    disabled,
    onChange
}: GuestJournalFieldProps) => {
    const t = useTranslations()
    const id = useId()

    return (
        <div>
            <label
                htmlFor={id}
                className={'mb-1.5 block text-base font-semibold text-foreground'}
            >
                {t(startLocales.journal.label)}
                <span className={'ms-1.5 text-sm font-normal text-muted-foreground'}>
                    {`(${t(startLocales.journal.optional)})`}
                </span>
            </label>
            <Input
                id={id}
                size={'lg'}
                variant={'card'}
                maxLength={JOURNAL_MAX_LENGTH}
                placeholder={t(startLocales.journal.placeholder)}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
