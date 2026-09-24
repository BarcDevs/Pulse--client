import { useTranslations } from 'next-intl'

import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { supportLocales } from '@/locales/supportLocales'

type SupportContactSentProps = {
    onSendAnother: () => void
}

export const SupportContactSent = ({
    onSendAnother
}: SupportContactSentProps) => {
    const t = useTranslations()

    return (
        <div className={'rounded-xl border border-border bg-surface-page px-6 py-8 text-center'}>
            <div className={'mx-auto mb-3.5 flex size-14 items-center justify-center rounded-full bg-linear-to-br from-emerald-100 to-secondary-fixed'}>
                <Check className={'size-[26px] text-secondary-deep'}/>
            </div>
            <p className={'mb-1.5 text-base font-bold text-on-surface'}>
                {t(supportLocales.contact.sent.title)}
            </p>
            <p className={'mb-3.5 text-[13px] leading-[1.6] text-muted-foreground'}>
                {t(supportLocales.contact.sent.description)}
            </p>
            <Button
                variant={'outline'}
                size={'sm'}
                onClick={onSendAnother}
                className={'rounded-lg text-xs font-semibold text-on-surface'}
            >
                {t(supportLocales.contact.sent.another)}
            </Button>
        </div>
    )
}
