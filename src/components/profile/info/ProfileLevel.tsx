import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'

import { profileLocales } from '@/locales/profileLocales'

// TODO: Add user level/badge data to Profile type
export const ProfileLevel = () => {
    const t = useTranslations()

    return (
        <Badge className={'mt-3 bg-secondary text-white'}>
            {t(profileLocales.levelBadge)}
        </Badge>
    )
}