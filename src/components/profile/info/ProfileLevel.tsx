import { useTranslations } from 'next-intl'

import { Badge } from '@/components/shared/badges/Badge'

import { profileLocales } from '@/locales/profileLocales'

export const ProfileLevel = () => {
    const t = useTranslations()

    return (
        <Badge
            variant={'secondary'}
            className={'mt-3'}
        >
            {t(
                profileLocales.levelBadge,
                {
                    level: 3,
                    title: 'Recovery Champion' // todo: add level title to translations
                }
            )}
        </Badge>
    )
}
