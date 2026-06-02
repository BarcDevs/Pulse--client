import { useTranslations } from 'next-intl'

import { format } from 'date-fns'

import { useDateLocale } from '@/hooks/ui/useDateLocale'

import { profileLocales } from '@/locales/profileLocales'

type ProfileInfoProps = {
    firstName: string
    lastName: string
    createdAt: string
}

export const ProfileInfo = ({
    firstName,
    lastName,
    createdAt
}: ProfileInfoProps) => {
    const t = useTranslations()
    const dateLocale = useDateLocale()
    const memberDate = format(
        new Date(createdAt),
        'MMM yyyy',
        { locale: dateLocale }
    )

    return (
        <div>
            <h2 className={'mt-4 text-xl font-semibold text-foreground'}>
                {`${firstName} ${lastName}`}
            </h2>
            <p className={'mt-1 text-sm text-muted-foreground'}>
                {`${t(profileLocales.info.memberSince)} ${memberDate}`}
            </p>
        </div>
    )
}