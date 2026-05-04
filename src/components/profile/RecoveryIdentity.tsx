import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { recoveryFocusAreasWithIcons }
    from '@/constants/mappings/profile'

import { profileLocales } from '@/locales/profileLocales'

export const RecoveryIdentity = () => {
    const t = useTranslations()

    return (
        <div className={'card-base'}>
            <h3 className={'text-lg font-semibold text-foreground mb-2'}>
                {t(profileLocales.recoveryIdentity.title)}
            </h3>
            <p className={'text-sm text-muted-foreground mb-6'}>
                {t(profileLocales.recoveryIdentity.subtitle)}
            </p>

            <div className={'flex--wrap gap-3 mb-6'}>
                {recoveryFocusAreasWithIcons.map((area) => (
                    <div
                        key={area.label}
                        className={cn(
                            'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                            area.color
                        )}
                    >
                        <area.icon className={'h-4 w-4'}/>
                        <span className={'text-sm font-medium'}>
                            {area.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className={'bg-surface-section rounded-xl p-4'}>
                <p className={'text-sm text-muted-foreground italic leading-relaxed'}>
                    &quot;{t(profileLocales.recoveryIdentity.quote)}&quot;
                </p>
            </div>
        </div>
    )
}
