import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'

import { profileLocales } from '@/locales/profileLocales'

export const ProfileLevel = () => {
    const t = useTranslations()

    return (
        <Badge className={'mt-3 bg-secondary text-white'}>
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
