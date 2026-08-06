import { useTranslations } from 'next-intl'

import { legalLocales } from '@/locales/legalLocales'

type LegalMetaBarProps = {
    updated: string
}

export const LegalMetaBar = ({ updated }: LegalMetaBarProps) => {
    const t = useTranslations()

    return (
        <div className={'border-b border-border bg-card px-4 py-3 md:px-8'}>
            <div className={'mx-auto flex max-w-5xl flex-wrap items-center gap-4 text-xs text-muted-foreground'}>
                <span>
                    <strong className={'text-on-surface'}>{t(legalLocales.common.metaBar.lastUpdated)}</strong>
                    {updated}
                </span>
                <span>{'·'}</span>
                <span>
                    <strong className={'text-on-surface'}>{t(legalLocales.common.metaBar.effectiveIn)}</strong>
                    {t(legalLocales.common.metaBar.effectiveInValue)}
                </span>
            </div>
        </div>
    )
}
